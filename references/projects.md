# Todoist Projects

Stand: 2026-05-06

## Kurzfassung

- `GET /api/v1/projects` listet aktive Projects.
- Optional kann nach `folder_id` oder `workspace_id` gefiltert werden.
- Die Project-Liste ist paginiert und verwendet `cursor` plus `limit`.
- Laut Doku ist `limit` standardmäßig `50` und maximal `200`.

## Praktische Regeln

1. Für große Project-Bestände immer `next_cursor` auswerten.
2. `folder_id` und `workspace_id` nicht gleichzeitig fachlich verwechseln; bei gesetztem `folder_id` wird `workspace_id` ignoriert.
3. Für lokale Mappings lieber stabile Project-IDs und Namen zusammen speichern.

## Minimalbeispiel

```bash
curl "https://api.todoist.com/api/v1/projects?limit=50" \
  -H "Authorization: Bearer YOUR_TODOIST_TOKEN"
```

## Quellen

- Todoist API
  - URL: https://developer.todoist.com/api/v1/
  - Relevante Stellen: Get Projects, Pagination
  - Gelesen: 2026-05-06
