# Todoist Capability Matrix

Stand: 2026-05-06

Zweck: Einordnung, was für den Skill sofort sinnvoll ist, was später als Tool taugt und was vorerst niedrige Priorität hat.

## Jetzt sinnvoll im Skill

### Tasks lesen und filtern
- Nutzen: hoch
- Warum: Kern-Use-Case für operative Todoist-Arbeit
- Typisch: aktive Tasks, Filter nach Project, Section, Label oder Filter-Query
- Lokale Folge-Dateien: `tasks.md`

### Projects lesen
- Nutzen: hoch
- Warum: nötig für Routing, Zuordnung und lokale Mappings
- Lokale Folge-Dateien: `projects.md`

### Quick Add für Natural-Language-Tasks
- Nutzen: hoch
- Warum: sehr nah an realer Todoist-Nutzung
- Lokale Folge-Dateien: `tasks.md`

### Inkrementeller Sync
- Nutzen: hoch
- Warum: effizient für Zustandsabgleich und große Accounts
- Lokale Folge-Dateien: `sync.md`

### Webhooks
- Nutzen: mittel bis hoch
- Warum: gut für Automatisierung, aber nicht als alleinige Datenquelle
- Lokale Folge-Dateien: `webhooks.md`

## Später als Tool sinnvoll

### Stabiler Task-Zugriff
- Priorität: hoch
- Warum als Tool: wiederkehrende Filter- und Pagination-Logik
- Mögliche Tool-Aktionen:
  - `list_tasks`
  - `get_task`
  - `close_task`

### Quick-Add-Kapselung
- Priorität: hoch
- Warum als Tool: Natural-Language-Eingaben, Validierung und Fehlerbehandlung wiederholen sich
- Mögliche Tool-Aktionen:
  - `quick_add_task`

### Sync-State-Verwaltung
- Priorität: hoch
- Warum als Tool: `sync_token`, Delta-Abrufe und Persistenz lassen sich sauber kapseln
- Mögliche Tool-Aktionen:
  - `sync_resources`
  - `resume_sync`

### Webhook-unterstützte Automatisierung
- Priorität: mittel
- Warum als Tool: Idempotenz, Nachladen und Event-Normalisierung profitieren von Zentralisierung
- Mögliche Tool-Aktionen:
  - `handle_webhook_event`
  - `refresh_resource_after_event`

## Vorläufig beobachten oder nur bei Bedarf

### OAuth und Multi-User-Integrationen
- Priorität: mittel
- Nutzen: relevant für veröffentlichte Integrationen
- Warum noch nicht zuerst: für lokalen Agentenbetrieb oft nicht nötig

### Kommentare, Uploads, Activity, Backups, Workspaces
- Priorität: niedrig bis mittel
- Nutzen: je nach späterem Workflow
- Warum noch nicht zuerst: nicht Kern unseres ersten Todoist-Flows

## Nicht blind einplanen

### UI-nahe Platzhalter-IDs
- `tmp-...`-IDs sind laut Doku keine gültigen Server-IDs
- erst Sync abwarten, dann echte IDs verwenden

### Grenzwerte und Pagination
- `limit` nicht über `200` setzen
- Cursor-basierte Pagination nicht ignorieren

## Empfehlung für unsere Reihenfolge

1. `auth.md`
2. `tasks.md`
3. `projects.md`
4. `sync.md`
5. `webhooks.md`
6. danach Tool-Entwurf für Task-Zugriff oder Sync-State

## Quellen

- Todoist API
  - URL: https://developer.todoist.com/api/v1/
  - Gelesen: 2026-05-06
