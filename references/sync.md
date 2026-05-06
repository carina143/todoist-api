# Todoist Sync

Stand: 2026-05-06

## Kurzfassung

- Todoist bietet den Endpunkt `/api/v1/sync` für effizienten Voll- und Delta-Abruf.
- Sync-Requests werden als `HTTP POST` mit `application/x-www-form-urlencoded` gesendet.
- Ein Initialabruf startet mit `sync_token=*`.
- Die Antwort liefert einen neuen `sync_token`, der für inkrementelle Folgeabrufe verwendet wird.

## Warum `/sync` wichtig ist

- Lesen und Schreiben mehrerer Ressourcen kann in einem Request gebündelt werden.
- Inkrementeller Sync reduziert unnötige API-Calls.
- Manche Aktionen sind laut Doku nur über `/sync` verfügbar.

## Praktische Regeln

1. Für den ersten Lauf `sync_token=*` setzen.
2. Für Folgeabrufe den zuletzt erhaltenen `sync_token` wiederverwenden.
3. Bei großen Accounts nach dem Initial-Sync einen inkrementellen zweiten Lauf einplanen.
4. Resource-Typen klein halten, wenn nicht wirklich `all` benötigt wird.

## Minimalbeispiel

```bash
curl https://api.todoist.com/api/v1/sync \
  -H "Authorization: Bearer YOUR_TODOIST_TOKEN" \
  -d sync_token='*' \
  -d resource_types='["projects","items","sections","labels"]'
```

## Hinweise

- `temp_id` in Sync-Kommandos ist nicht dasselbe wie clientseitige `tmp-...`-Platzhalter-IDs.
- Platzhalter-IDs aus UI-Kontexten erst nach erfolgreichem Sync in echte IDs auflösen.
- Sync ist das richtige Mittel für Zustandsabgleich, nicht zwingend für jede Einzelfrage.

## Quellen

- Todoist API
  - URL: https://developer.todoist.com/api/v1/
  - Relevante Stellen: Sync Overview, Incremental sync, Resource IDs and optimistic updates
  - Gelesen: 2026-05-06
