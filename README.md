# todoist-api skill

Kompakter Skill für Todoist-Workflows rund um Tasks, Projects, Quick Add, Sync und Webhooks.

## Inhalt

- [SKILL.md](SKILL.md): Arbeitsregeln und Einsatzbereich des Skills
- [scripts/](scripts/): wiederverwendbare Node-Skripte für Todoist API
- [references/](references/): kuratierte Fachreferenzen zur Todoist-Doku

## Voraussetzungen

- Node.js (empfohlen: aktuelles LTS oder neuer)
- Secrets in einer der folgenden Dateien:
  - `~/.openclaw/secrets.json`
  - `secrets.json` im Workspace-Root (Fallback)

Erwartete Struktur:

```json
{
  "integrations": {
    "todoist": {
      "accounts": {
        "<email>": {
          "apiToken": "YOUR_TODOIST_TOKEN"
        }
      }
    }
  }
}
```

Akzeptierte Fallback-Felder für bestehende Setups: `token`, `accessToken`.

## Schnellstart

Vom Repo-Root [skills/todoist-api](skills/todoist-api):

```bash
node scripts/list-projects.mjs --limit 10
node scripts/list-tasks.mjs --limit 10
node scripts/quick-add-task.mjs --text "Review BOKU project plan tomorrow 10am #Inbox"
node scripts/sync-resources.mjs --resources projects,items,sections,labels
```

## Lizenz

MIT, siehe [LICENSE](LICENSE).
