#!/usr/bin/env bash
# Publishes the site to a small VPS: build here, copy the static files,
# let Caddy serve them with automatic HTTPS.
#
# Usage:
#   deploy.sh setup                  once per server: installs Docker, creates the folder
#   deploy.sh push [--allow-todos]   builds and publishes

set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/lib.sh"

require_config() {
  [ -n "$SITE_DOMAIN" ] || die "SITE_DOMAIN in kit.env ist leer. Beispiel: SITE_DOMAIN=musterbetrieb.at"
  [ -n "$DEPLOY_HOST" ] || die "DEPLOY_HOST in kit.env ist leer. Beispiel: DEPLOY_HOST=root@203.0.113.10"
}

remote() { ssh -o BatchMode=yes -o ConnectTimeout=15 "$DEPLOY_HOST" "$@"; }

cmd_setup() {
  require_config
  info "Server vorbereiten: $DEPLOY_HOST"
  remote "DEPLOY_PATH='$DEPLOY_PATH' bash -s" <<'REMOTE'
set -euo pipefail
SUDO=""
[ "$(id -u)" -eq 0 ] || SUDO="sudo"
if ! command -v docker >/dev/null 2>&1; then
  curl -fsSL https://get.docker.com | $SUDO sh
fi
$SUDO docker compose version >/dev/null
$SUDO mkdir -p "$DEPLOY_PATH/site" "$DEPLOY_PATH/caddy"
$SUDO chown -R "$(id -un)" "$DEPLOY_PATH"
if [ "$(id -u)" -ne 0 ]; then $SUDO usermod -aG docker "$(id -un)"; fi
if command -v ufw >/dev/null 2>&1 && $SUDO ufw status | grep -q "Status: active"; then
  $SUDO ufw allow 80/tcp >/dev/null
  $SUDO ufw allow 443 >/dev/null
fi
echo "Docker $(docker --version | cut -d' ' -f3 | tr -d ,) bereit, Ordner $DEPLOY_PATH angelegt"
REMOTE
  ok "Server ist vorbereitet. Veröffentlichen mit: npm run deploy"
  info "Der DNS-Eintrag (A-Record) von $SITE_DOMAIN muss auf die IP des Servers zeigen, sonst erhält Caddy kein Zertifikat."
}

write_caddyfile() {
  # $1 = target file. Appends one redirect block per alias domain.
  cp "$ROOT_DIR/deploy/caddy/Caddyfile" "$1"
  local alias
  for alias in $DOMAIN_ALIASES; do
    printf '\n%s {\n\tredir https://%s{uri} permanent\n}\n' "$alias" "$SITE_DOMAIN" >>"$1"
  done
}

cmd_push() {
  local allow_todos=0
  [ "${1:-}" = "--allow-todos" ] && allow_todos=1
  require_config

  cd "$ROOT_DIR"
  if [ "$allow_todos" -eq 0 ] && ! bash scripts/todos.sh --strict; then
    die "Veröffentlichung abgebrochen: Der Inhalt enthält noch Platzhalter. Erst ersetzen, oder bewusst mit --allow-todos veröffentlichen."
  fi

  info "Website bauen für https://$SITE_DOMAIN"
  npm run --silent build
  [ -f dist/index.html ] || die "Der Build hat keine dist/index.html erzeugt."

  # Global on purpose: the EXIT trap runs after this function has returned.
  stage="$(mktemp -d)"
  trap 'rm -rf "$stage"' EXIT
  mkdir -p "$stage/caddy"
  write_caddyfile "$stage/caddy/Caddyfile"
  cp "$ROOT_DIR/deploy/compose.yaml" "$stage/compose.yaml"
  printf 'DOMAIN=%s\n' "$SITE_DOMAIN" >"$stage/.env"

  info "Dateien übertragen nach $DEPLOY_HOST:$DEPLOY_PATH"
  remote "mkdir -p '$DEPLOY_PATH/site' '$DEPLOY_PATH/caddy'" ||
    die "Der Server ist nicht erreichbar oder nicht vorbereitet. Einmalig ausführen: npm run deploy:setup"
  rsync -az --delete dist/ "$DEPLOY_HOST:$DEPLOY_PATH/site/"
  rsync -az "$stage/caddy/" "$DEPLOY_HOST:$DEPLOY_PATH/caddy/"
  rsync -az "$stage/compose.yaml" "$stage/.env" "$DEPLOY_HOST:$DEPLOY_PATH/"

  remote "cd '$DEPLOY_PATH' && docker compose up -d --quiet-pull && { docker compose exec -T caddy caddy reload --config /etc/caddy/Caddyfile >/dev/null 2>&1 || true; }"

  if curl -fsS -o /dev/null --max-time 20 "https://$SITE_DOMAIN/"; then
    ok "Veröffentlicht: https://$SITE_DOMAIN/"
  else
    warn "Die Dateien sind übertragen, aber https://$SITE_DOMAIN/ antwortet noch nicht."
    warn "Prüfe den DNS-Eintrag und das Server-Log: ssh $DEPLOY_HOST 'cd $DEPLOY_PATH && docker compose logs --tail 40 caddy'"
    exit 1
  fi
}

case "${1:-}" in
  setup) cmd_setup ;;
  push) cmd_push "${2:-}" ;;
  *) die "Aufruf: deploy.sh <setup|push [--allow-todos]>" ;;
esac
