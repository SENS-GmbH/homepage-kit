#!/usr/bin/env bash
# Installs the OpenClaw skill for this website and a watchdog job that
# restarts the preview when it stops answering. Skills that belong to
# another project are never overwritten or removed.
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

skill_dir() { echo "$(workspace_dir)/skills/$SKILL_NAME"; }

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

# True when the installed skill of this name points at this repo.
skill_is_ours() { grep -qF "$ROOT_DIR" "$(skill_dir)/SKILL.md" 2>/dev/null; }

install_skill() {
  local dir src preview_url out
  dir="$(skill_dir)"
  if [ -e "$dir" ] && ! skill_is_ours; then
    die "In OpenClaw gibt es bereits einen Skill /$SKILL_NAME, der nicht zu diesem Repo gehört. Wähle einen anderen Namen: npm run setup -- --skill <name>"
  fi

  src="$STATE_DIR/skill"
  preview_url="$(tailnet_url 2>/dev/null || echo "$HEALTH_URL")"
  rm -rf "$src"
  mkdir -p "$src"
  REPO="$ROOT_DIR" SKILL="$SKILL_NAME" TRIGGERS="$SKILL_TRIGGERS" LOCAL_URL="$HEALTH_URL" PREVIEW_URL="$preview_url" \
    node -e '
      const fs = require("node:fs")
      const env = process.env
      // The description decides when OpenClaw picks the skill. It is written as a
      // quoted string because the trigger words may contain YAML syntax.
      let description =
        `Website im Repo ${env.REPO} pflegen. Verwenden bei /${env.SKILL} oder wenn jemand Texte, Bilder, ` +
        `Öffnungszeiten oder Gestaltung der Website ändern, Beispiele und Material dafür schicken, ` +
        `die Vorschau prüfen oder die Website veröffentlichen möchte.`
      if (env.TRIGGERS) description += ` Verwenden auch bei diesen Stichworten: ${env.TRIGGERS}.`
      let text = fs.readFileSync(process.argv[1], "utf8")
      text = text.split("{{DESCRIPTION}}").join(JSON.stringify(description))
      for (const key of ["REPO", "SKILL", "LOCAL_URL", "PREVIEW_URL"]) {
        text = text.split(`{{${key}}}`).join(env[key])
      }
      fs.writeFileSync(process.argv[2], text)
    ' "$ROOT_DIR/openclaw/SKILL.md.tmpl" "$src/SKILL.md"

  # OpenClaw only lists skills that went through its own installer.
  if ! out="$(openclaw skills install "$src" --as "$SKILL_NAME" --force --acknowledge-install-policy-warning 2>&1)"; then
    warn "Der Skill ließ sich nicht installieren. Meldung von OpenClaw: $(printf '%s' "$out" | tail -n 3)"
    return 1
  fi
  ok "OpenClaw-Skill installiert: /$SKILL_NAME"
  [ -z "$SKILL_TRIGGERS" ] || info "  Springt auch an bei: $SKILL_TRIGGERS"
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
  if skill_is_ours; then rm -rf "$(skill_dir)"; fi
  ok "OpenClaw-Skill und Wächter-Job entfernt"
}

cmd_status() {
  if ! have_openclaw; then
    warn "OpenClaw ist nicht installiert"
    return 0
  fi
  if skill_is_ours && openclaw skills info "$SKILL_NAME" 2>/dev/null | grep -q "Ready"; then
    ok "OpenClaw-Skill bereit: /$SKILL_NAME"
  else
    warn "OpenClaw-Skill fehlt oder ist nicht bereit: /$SKILL_NAME"
  fi
  if [ -n "$(watchdog_ids)" ]; then ok "Wächter-Job vorhanden: $WATCHDOG_NAME"; else warn "Wächter-Job fehlt: $WATCHDOG_NAME"; fi
}

case "${1:-}" in
  install) cmd_install ;;
  uninstall) cmd_uninstall ;;
  status) cmd_status ;;
  *) die "Aufruf: openclaw.sh <install|uninstall|status>" ;;
esac
