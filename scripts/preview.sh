#!/usr/bin/env bash
# Live preview service: one Astro dev server on loopback, kept alive by launchd,
# reachable in the tailnet through `tailscale serve`.
#
# Usage: preview.sh <install|uninstall|check|restart|status|logs|share|unshare|dev>

set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/lib.sh"

PREVIEW_PLIST="$LAUNCH_AGENTS_DIR/$PREVIEW_LABEL.plist"
LAN_PLIST="$LAUNCH_AGENTS_DIR/$LAN_LABEL.plist"
ASTRO_BIN="$ROOT_DIR/node_modules/astro/bin/astro.mjs"
GUI_DOMAIN="gui/$(id -u)"

require_macos() {
  is_macos || die "Der Vorschau-Dienst nutzt launchd und läuft nur auf macOS. Auf anderen Systemen: npm run dev"
}

write_plist() {
  # $1 = plist path, $2 = label, $3 = subcommand, $4 = log name
  local node_dir
  node_dir="$(dirname "$(command -v node)")"
  mkdir -p "$LAUNCH_AGENTS_DIR" "$STATE_DIR"
  cat >"$1" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>Label</key>
	<string>$2</string>
	<key>ProgramArguments</key>
	<array>
		<string>/bin/bash</string>
		<string>$ROOT_DIR/scripts/preview.sh</string>
		<string>$3</string>
	</array>
	<key>EnvironmentVariables</key>
	<dict>
		<key>PATH</key>
		<string>$node_dir:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin</string>
	</dict>
	<key>WorkingDirectory</key>
	<string>$ROOT_DIR</string>
	<key>RunAtLoad</key>
	<true/>
	<key>KeepAlive</key>
	<true/>
	<key>ThrottleInterval</key>
	<integer>10</integer>
	<key>StandardOutPath</key>
	<string>$STATE_DIR/$4.log</string>
	<key>StandardErrorPath</key>
	<string>$STATE_DIR/$4.log</string>
</dict>
</plist>
PLIST
}

load_agent() {
  # $1 = plist path, $2 = label
  launchctl bootout "$GUI_DOMAIN/$2" >/dev/null 2>&1 || true
  # bootout returns before the old process is gone; bootstrap fails until then.
  local tries=10
  until launchctl bootstrap "$GUI_DOMAIN" "$1" >/dev/null 2>&1; do
    tries=$((tries - 1))
    [ "$tries" -gt 0 ] || die "launchd konnte $2 nicht laden. Prüfe: launchctl print $GUI_DOMAIN/$2"
    sleep 1
  done
}

unload_agent() {
  # $1 = plist path, $2 = label
  launchctl bootout "$GUI_DOMAIN/$2" >/dev/null 2>&1 || true
  rm -f "$1"
}

agent_loaded() { launchctl print "$GUI_DOMAIN/$1" >/dev/null 2>&1; }

cmd_install() {
  require_macos
  command -v node >/dev/null 2>&1 || die "Node.js fehlt. Installiere es mit: brew install node"
  [ -f "$ASTRO_BIN" ] || die "Abhängigkeiten fehlen. Führe zuerst aus: npm install"

  if in_synced_folder; then
    warn "Das Repo liegt in einem iCloud-synchronisierten Ordner ($ROOT_DIR)."
    warn "macOS kann dort Dateien auslagern, dann fällt die Vorschau mit Fehler -11 aus. Verschiebe es nach ~/Developer."
  fi

  if ! agent_loaded "$PREVIEW_LABEL" && port_in_use "$PREVIEW_PORT"; then
    die "Port $PREVIEW_PORT ist bereits belegt. Trage in kit.env einen freien PREVIEW_PORT ein."
  fi

  write_plist "$PREVIEW_PLIST" "$PREVIEW_LABEL" run preview
  load_agent "$PREVIEW_PLIST" "$PREVIEW_LABEL"
  if wait_live 45; then
    ok "Vorschau läuft: $HEALTH_URL"
  else
    die "Die Vorschau antwortet nicht. Log: $STATE_DIR/preview.log"
  fi

  if [ -n "$LAN_PORT" ]; then
    write_plist "$LAN_PLIST" "$LAN_LABEL" lan-run lan-proxy
    load_agent "$LAN_PLIST" "$LAN_LABEL"
    ok "WLAN-Zugriff aktiv auf Port $LAN_PORT (ohne Anmeldung, nur im vertrauten Netz nutzen)"
  elif [ -f "$LAN_PLIST" ]; then
    unload_agent "$LAN_PLIST" "$LAN_LABEL"
  fi
}

cmd_uninstall() {
  require_macos
  unload_agent "$PREVIEW_PLIST" "$PREVIEW_LABEL"
  unload_agent "$LAN_PLIST" "$LAN_LABEL"
  ok "Vorschau-Dienste entfernt"
}

# Entry point for launchd. astro.config.mjs sets strictPort, so a taken port
# ends the process and launchd retries instead of serving on another port.
cmd_run() {
  cd "$ROOT_DIR"
  exec node "$ASTRO_BIN" dev --host 127.0.0.1 --port "$PREVIEW_PORT"
}

cmd_lan_run() {
  [ -n "$LAN_PORT" ] || die "LAN_PORT ist nicht gesetzt."
  exec node "$ROOT_DIR/scripts/lan-proxy.mjs" "$LAN_PORT" "$PREVIEW_PORT"
}

kickstart() { launchctl kickstart -k "$GUI_DOMAIN/$PREVIEW_LABEL" >/dev/null 2>&1; }

# Health check for the watchdog. Exit 0 = healthy or repaired, 1 = still down.
cmd_check() {
  if is_live; then
    echo "Vorschau gesund: $HEALTH_URL"
    return 0
  fi
  require_macos
  [ -f "$PREVIEW_PLIST" ] || die "Vorschau-Dienst ist nicht eingerichtet. Führe aus: npm run setup"
  agent_loaded "$PREVIEW_LABEL" || launchctl bootstrap "$GUI_DOMAIN" "$PREVIEW_PLIST" >/dev/null 2>&1 || true

  kickstart || true
  if wait_live 30; then
    echo "Vorschau neu gestartet: $HEALTH_URL"
    return 0
  fi

  # A stale dependency cache makes the dev server answer 504 until it is cleared.
  rm -rf "$ROOT_DIR/node_modules/.vite" "$ROOT_DIR/.astro"
  kickstart || true
  if wait_live 45; then
    echo "Vorschau nach Cache-Bereinigung neu gestartet: $HEALTH_URL"
    return 0
  fi

  echo "Vorschau startet nicht. Letzte Log-Zeilen:" >&2
  tail -n 15 "$STATE_DIR/preview.log" >&2 2>/dev/null || true
  return 1
}

cmd_restart() {
  require_macos
  [ -f "$PREVIEW_PLIST" ] || die "Vorschau-Dienst ist nicht eingerichtet. Führe aus: npm run setup"
  agent_loaded "$PREVIEW_LABEL" || launchctl bootstrap "$GUI_DOMAIN" "$PREVIEW_PLIST" >/dev/null 2>&1 || true
  kickstart || true
  wait_live 45 || die "Die Vorschau antwortet nach dem Neustart nicht. Log: $STATE_DIR/preview.log"
  ok "Vorschau neu gestartet: $HEALTH_URL"
}

cmd_status() {
  if is_live; then ok "Vorschau antwortet: $HEALTH_URL"; else warn "Vorschau antwortet nicht: $HEALTH_URL"; fi
  if is_macos; then
    if agent_loaded "$PREVIEW_LABEL"; then ok "launchd-Dienst geladen: $PREVIEW_LABEL"; else warn "launchd-Dienst nicht geladen: $PREVIEW_LABEL"; fi
  fi
  local url
  if url="$(tailnet_url)"; then info "  Tailscale-Adresse: $url"; fi
}

cmd_logs() { tail -n "${1:-60}" "$STATE_DIR/preview.log"; }

cmd_share() {
  local ts url
  ts="$(find_tailscale)" || die "Tailscale fehlt. Installiere es von https://tailscale.com/download und melde dich an."
  "$ts" status >/dev/null 2>&1 || die "Tailscale ist nicht verbunden. Öffne die Tailscale-App und melde dich an."
  "$ts" serve --bg --https="$PREVIEW_PORT" "http://127.0.0.1:$PREVIEW_PORT" >/dev/null ||
    die "tailscale serve ist fehlgeschlagen. Aktiviere im Tailscale-Adminbereich unter DNS die Optionen MagicDNS und HTTPS-Zertifikate."
  url="$(tailnet_url)" || die "Die Tailscale-Adresse dieses Rechners ließ sich nicht ermitteln."
  ok "Im Tailnet erreichbar: $url"
}

cmd_unshare() {
  local ts
  ts="$(find_tailscale)" || die "Tailscale fehlt."
  "$ts" serve --https="$PREVIEW_PORT" off >/dev/null
  ok "Tailscale-Freigabe für Port $PREVIEW_PORT beendet"
}

# Manual dev server. Refuses to start a second one next to the service:
# two dev servers share one dependency cache and corrupt it.
cmd_dev() {
  if is_live; then
    info "Die Vorschau läuft bereits: $HEALTH_URL"
    info "Ein zweiter Dev-Server würde den gemeinsamen Cache beschädigen. Zum Prüfen von Änderungen: npm run check"
    return 0
  fi
  cmd_run
}

case "${1:-}" in
  install) cmd_install ;;
  uninstall) cmd_uninstall ;;
  run) cmd_run ;;
  lan-run) cmd_lan_run ;;
  check) cmd_check ;;
  restart) cmd_restart ;;
  status) cmd_status ;;
  logs) cmd_logs "${2:-}" ;;
  share) cmd_share ;;
  unshare) cmd_unshare ;;
  dev) cmd_dev ;;
  *) die "Aufruf: preview.sh <install|uninstall|check|restart|status|logs|share|unshare|dev>" ;;
esac
