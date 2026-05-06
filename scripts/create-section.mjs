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

    if (arg === '--name' && next) {
      args.name = next;
      i += 1;
    } else if (arg === '--project-id' && next) {
      args.project_id = next;
      i += 1;
    } else if (arg === '--order' && next) {
      args.order = parseInteger(next);
      i += 1;
    }
  }

  return args;
}

const options = parseArgs(process.argv.slice(2));

if (!options.name) {
  printError(new Error('missing_name'));
  process.exit(2);
}

if (!options.project_id) {
  printError(new Error('missing_project_id'));
  process.exit(2);
}

if (options.order === null) {
  printError(new Error('order_must_be_integer'));
  process.exit(2);
}

try {
  const body = {
    name: options.name,
    project_id: assertServerId(options.project_id, 'project_id')
  };

  if (options.order !== undefined) {
    body.order = options.order;
  }

  const data = await todoistRequest({
    method: 'POST',
    path: '/sections',
    body
  });

  printJson({
    ok: true,
    section: data
  });
} catch (error) {
  printError(error);
  process.exit(1);
}
