# Todoist Auth

Stand: 2026-05-06

## Kurzfassung

- Todoist verwendet Bearer-Token für authentifizierte API-Requests.
- Laut offizieller Doku wird der Header als `Authorization: Bearer <token>` gesendet.
- Für persönliche Tests kann der persönliche API-Token aus den Integrations-Einstellungen des Accounts verwendet werden.
- Für Dritt-User-Flows ist OAuth vorgesehen.

## Lokale Secret-Konvention

- Lokaler Speicherort: `~/.openclaw/secrets.json`
- Für einen eingerichteten Account:
  - `integrations.todoist.accounts["<email>"].apiToken`
- Akzeptierte Fallback-Felder:
  - `token`
  - `accessToken`
- Wegen Sonderzeichen in der Mailadresse immer String-Key-Notation verwenden.

## Minimalbeispiel

```bash
curl https://api.todoist.com/api/v1/tasks \
  -H "Authorization: Bearer YOUR_TODOIST_TOKEN"
```

## Hinweise

- Token wie ein Passwort behandeln.
- Nicht in clientseitigem Code oder öffentlichen Repos speichern.
- `secrets.json` niemals committen oder in Pull Requests aufnehmen.
- Wenn ein Account-Objekt fehlt, nur Vorlagen, Beispiele oder Integrationsplan liefern.
- Für OAuth-Integrationen Client-ID, Client-Secret und Redirect-URLs im Todoist App Management sauber verwalten.

## Quellen

- Todoist API
  - URL: <https://developer.todoist.com/api/v1/>
  - Relevante Stellen: Authorization, OAuth
  - Gelesen: 2026-05-06
