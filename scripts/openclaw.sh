#!/usr/bin/env bash
# Installs the OpenClaw skill for this website and a watchdog job that
# restarts the preview when it stops answering.
#
# Usage: openclaw.sh <install|uninstall|status>

set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/lib.sh"

have_openclaw() { command -v openclaw >/dev/null 2>&1; }

workspace_dir() {
  local ws
  ws="$(openclaw config get agents.defaults.workspace 2>/dev/null | tail -n 1 || true)"
  case "$ws" in
    /*) echo "$ws" ;;
    *) echo "$HOME/.openclaw/workspace" ;;
  esac
}

skill_dir() { echo "$(workspace_dir)/skills/$SITE_SLUG"; }

# Prints the ids of all watchdog jobs that belong to this website.
watchdog_ids() {
  openclaw cron list --json 2>/dev/null | WATCHDOG_NAME="$WATCHDOG_NAME" node -e '
    let s = ""
    process.stdin.on("data", (d) => (s += d)).on("end", () => {
      try {
        const start = s.search(/[\[{]/)
        const data = JSON.parse(s.slice(start))
        const jobs = Array.isArray(data) ? data : data.jobs || data.items || []
        for (const job of jobs) if (job.name === process.env.WATCHDOG_NAME) console.log(job.id)
      } catch {}
    })'
}

remove_watchdog() {
  local id
  for id in $(watchdog_ids); do
    openclaw cron rm "$id" >/dev/null 2>&1 || warn "Wächter-Job $id ließ sich nicht entfernen."
  done
}

install_skill() {
  local dir preview_url
  dir="$(skill_dir)"
  preview_url="$(tailnet_url 2>/dev/null || echo "$HEALTH_URL")"
  mkdir -p "$dir"
  REPO="$ROOT_DIR" SLUG="$SITE_SLUG" LOCAL_URL="$HEALTH_URL" PREVIEW_URL="$preview_url" \
    node -e '
      const fs = require("node:fs")
      let text = fs.readFileSync(process.argv[1], "utf8")
      for (const key of ["REPO", "SLUG", "LOCAL_URL", "PREVIEW_URL"]) {
        text = text.split(`{{${key}}}`).join(process.env[key])
      }
      fs.writeFileSync(process.argv[2], text)
    ' "$ROOT_DIR/openclaw/SKILL.md.tmpl" "$dir/SKILL.md"
  ok "OpenClaw-Skill installiert: /$SITE_SLUG ($dir/SKILL.md)"
}

install_watchdog() {
  local out id channel
  remove_watchdog
  if ! out="$(openclaw cron add \
    --name "$WATCHDOG_NAME" \
    --description "Prüft alle 5 Minuten die Website-Vorschau und startet sie bei Bedarf neu." \
    --every 5m \
    --session isolated \
    --no-deliver \
    --command-argv "[\"/bin/bash\",\"$ROOT_DIR/scripts/preview.sh\",\"check\"]" \
    --command-cwd "$ROOT_DIR" \
    --command-env "PATH=/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" \
    --json 2>&1)"; then
    warn "Der Wächter-Job ließ sich nicht anlegen. launchd startet die Vorschau nach einem Absturz trotzdem neu."
    warn "Meldung von OpenClaw: $(printf '%s' "$out" | tail -n 3)"
    return 0
  fi
  ok "Wächter-Job angelegt: $WATCHDOG_NAME (alle 5 Minuten)"

  [ -n "$WATCHDOG_ALERT_TO" ] || return 0
  id="$(watchdog_ids | head -n 1)"
  channel="${WATCHDOG_ALERT_TO%%:*}"
  if [ -n "$id" ] && openclaw cron edit "$id" \
    --failure-alert \
    --failure-alert-after 2 \
    --failure-alert-channel "$channel" \
    --failure-alert-to "$WATCHDOG_ALERT_TO" \
    --failure-alert-cooldown 1h >/dev/null 2>&1; then
    ok "Alarm nach zwei Fehlschlägen an $WATCHDOG_ALERT_TO"
  else
    warn "Der Alarm an $WATCHDOG_ALERT_TO ließ sich nicht einrichten."
  fi
}

cmd_install() {
  if ! have_openclaw; then
    warn "OpenClaw ist nicht installiert, Skill und Wächter werden übersprungen."
    warn "Nach der Installation von OpenClaw erneut ausführen: npm run setup"
    return 0
  fi
  install_skill
  install_watchdog
}

cmd_uninstall() {
  have_openclaw || return 0
  remove_watchdog
  rm -rf "$(skill_dir)"
  ok "OpenClaw-Skill und Wächter-Job entfernt"
}

cmd_status() {
  if ! have_openclaw; then
    warn "OpenClaw ist nicht installiert"
    return 0
  fi
  if [ -f "$(skill_dir)/SKILL.md" ]; then ok "OpenClaw-Skill vorhanden: /$SITE_SLUG"; else warn "OpenClaw-Skill fehlt: /$SITE_SLUG"; fi
  if [ -n "$(watchdog_ids)" ]; then ok "Wächter-Job vorhanden: $WATCHDOG_NAME"; else warn "Wächter-Job fehlt: $WATCHDOG_NAME"; fi
}

case "${1:-}" in
  install) cmd_install ;;
  uninstall) cmd_uninstall ;;
  status) cmd_status ;;
  *) die "Aufruf: openclaw.sh <install|uninstall|status>" ;;
esac
