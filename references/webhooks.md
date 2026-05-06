# Todoist Webhooks

Stand: 2026-05-06

## Kurzfassung

- Todoist-Webhooks senden HTTP-POST-Events für abonnierte User-Ereignisse.
- Webhook-URLs müssen laut Doku HTTPS verwenden und dürfen keinen Port enthalten.
- Webhooks sind Benachrichtigungen, nicht die primäre Datenquelle.

## Wichtige Regeln

1. Webhook-Payload immer als untrusted input behandeln.
2. Mit verspäteten, doppelt eintreffenden, ausbleibenden oder ungeordneten Events rechnen.
3. Nach einem Event bei relevanten Workflows lieber den aktuellen Zustand aktiv per API nachladen.
4. Für persönliche Nutzung muss die App laut Doku per OAuth mit dem eigenen Account aktiviert werden.

## Konsequenz für Agentenarbeit

- Webhooks nie blind als Source of Truth behandeln.
- Für robuste Automatisierung immer einen Follow-up-Read per API einplanen.
- Öffentliche oder unsaubere Callback-URLs vermeiden.

## Quellen

- Todoist API
  - URL: https://developer.todoist.com/api/v1/
  - Relevante Stellen: Webhooks, Webhook Activation & Personal Use
  - Gelesen: 2026-05-06
