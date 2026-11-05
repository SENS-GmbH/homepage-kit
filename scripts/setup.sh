#!/usr/bin/env bash
# One-time setup on the Mac that hosts the preview. Safe to run again.
#
# Usage: setup.sh [--no-tailscale] [--no-openclaw] [--uninstall]

set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/lib.sh"

USE_TAILSCALE=1
USE_OPENCLAW=1
UNINSTALL=0
for arg in "$@"; do
  case "$arg" in
    --no-tailscale) USE_TAILSCALE=0 ;;
    --no-openclaw) USE_OPENCLAW=0 ;;
    --uninstall) UNINSTALL=1 ;;
    *) die "Unbekannte Option: $arg. Erlaubt: --no-tailscale --no-openclaw --uninstall" ;;
  esac
done

SCRIPTS="$ROOT_DIR/scripts"

if [ "$UNINSTALL" -eq 1 ]; then
  bash "$SCRIPTS/openclaw.sh" uninstall
  bash "$SCRIPTS/preview.sh" unshare 2>/dev/null || true
  bash "$SCRIPTS/preview.sh" uninstall
  info "Das Repo selbst bleibt unverändert."
  exit 0
fi

is_macos || die "Das Setup richtet macOS-Dienste ein. Auf anderen Systemen: npm install && npm run dev"
command -v node >/dev/null 2>&1 || die "Node.js fehlt. Installiere es mit: brew install node"
node -e 'const [a,b]=process.versions.node.split(".").map(Number);process.exit(a>22||(a===22&&b>=23)?0:1)' ||
  die "Node.js $(node -v) ist zu alt. Benötigt wird Version 22.23 oder neuer: brew upgrade node"

cd "$ROOT_DIR"
info "Website: $SITE_SLUG · Port: $PREVIEW_PORT · Ordner: $ROOT_DIR"

info "1/4 Abhängigkeiten installieren"
if [ -f package-lock.json ]; then npm ci --no-audit --no-fund --loglevel=error >/dev/null; else npm install --no-audit --no-fund --loglevel=error >/dev/null; fi
ok "Abhängigkeiten installiert"

info "2/4 Vorschau-Dienst einrichten"
bash "$SCRIPTS/preview.sh" install

info "3/4 Tailscale-Freigabe"
if [ "$USE_TAILSCALE" -eq 1 ]; then
  bash "$SCRIPTS/preview.sh" share || warn "Ohne Tailscale ist die Vorschau nur auf diesem Rechner erreichbar. Später nachholen: npm run share"
else
  info "  übersprungen"
fi

info "4/4 OpenClaw-Skill und Wächter"
if [ "$USE_OPENCLAW" -eq 1 ]; then
  bash "$SCRIPTS/openclaw.sh" install
else
  info "  übersprungen"
fi

info ""
info "Fertig. Nächster Schritt: Schreibe deinem OpenClaw »/$SITE_SLUG Leg los«."
info "Der Agent stellt dann die Fragen zum Betrieb und bittet um Beispiele und Material."
info "Status jederzeit prüfen: npm run status"
