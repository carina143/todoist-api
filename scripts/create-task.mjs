import { assertServerId, printError, printJson, todoistRequest } from './_todoist-client.mjs';

function parseInteger(value) {
  if (value === undefined) return undefined;
  const parsed = Number.parseInt(String(value), 10);
  return Number.isNaN(parsed) ? null : parsed;
}

function parseArgs(argv) {
  const args = {};

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];

    if (arg === '--content' && next) {
      args.content = next;
      i += 1;
    } else if (arg === '--description' && next) {
      args.description = next;
      i += 1;
    } else if (arg === '--project-id' && next) {
      args.project_id = next;
      i += 1;
    } else if (arg === '--section-id' && next) {
      args.section_id = next;
      i += 1;
    } else if (arg === '--priority' && next) {
      args.priority = parseInteger(next);
      i += 1;
    } else if (arg === '--deadline-date' && next) {
      args.deadline_date = next;
      i += 1;
    } else if (arg === '--due-string' && next) {
      args.due_string = next;
      i += 1;
    }
  }

  return args;
}

const options = parseArgs(process.argv.slice(2));

if (!options.content) {
  printError(new Error('missing_content'));
  process.exit(2);
}

if (options.priority === null) {
  printError(new Error('priority_must_be_integer'));
  process.exit(2);
}

try {
  const body = {
    content: options.content
  };

  if (options.description) {
    body.description = options.description;
  }

  if (options.project_id) {
    body.project_id = assertServerId(options.project_id, 'project_id');
  }

  if (options.section_id) {
    body.section_id = assertServerId(options.section_id, 'section_id');
  }

  if (options.priority !== undefined) {
    body.priority = options.priority;
  }

  if (options.deadline_date) {
    body.deadline = { date: options.deadline_date };
  }

  if (options.due_string) {
    body.due = { string: options.due_string };
  }

  const data = await todoistRequest({
    method: 'POST',
    path: '/tasks',
    body
  });

  printJson({
    ok: true,
    task: data
  });
} catch (error) {
  printError(error);
  process.exit(1);
}
