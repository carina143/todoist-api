# Todoist Tasks

Stand: 2026-05-06

## Kurzfassung

- `GET /api/v1/tasks` listet Tasks und unterstützt Filter wie `project_id`, `section_id`, `label`, `filter`, `ids`, `cursor` und `limit`.
- `GET /api/v1/tasks/{id}` lädt eine einzelne Task.
- `POST /api/v1/tasks/quick` unterstützt Natural-Language-Erfassung über Quick Add.
- Task-Listen sind paginiert; `limit` darf laut Doku höchstens `200` sein.

## Quick Add

Quick Add ist sinnvoll, wenn:
- der Nutzer eine Task in natürlicher Sprache formuliert
- Labels, Datum und Priorität direkt aus dem Text geparst werden sollen
- die Eingabe näher an der Todoist-UI als an einem starren JSON-Payload bleiben soll

Typische Felder:
- `text`
- `note`
- `auto_reminder`
- `parse_labels`

## Praktische Regeln

1. Für exakte API-gesteuerte Erstellung normale Create-Task-Endpunkte prüfen.
2. Für menschlich formulierte Eingaben Quick Add bevorzugen.
3. `tmp-`-IDs nie an REST-Endpunkte weiterreichen.
4. Pagination und `next_cursor` mitdenken, wenn mehr als eine Seite möglich ist.

## Minimalbeispiele

```bash
curl https://api.todoist.com/api/v1/tasks?limit=50 \
  -H "Authorization: Bearer YOUR_TODOIST_TOKEN"
```

```bash
curl https://api.todoist.com/api/v1/tasks/quick \
  -X POST \
  -H "Authorization: Bearer YOUR_TODOIST_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"text":"Review grant budget tomorrow 09:00 #Inbox","parse_labels":true}'
```

## Quellen

- Todoist API
  - URL: https://developer.todoist.com/api/v1/
  - Relevante Stellen: Get Tasks, Get Task, Quick Add, Pagination, Request limits
  - Gelesen: 2026-05-06
