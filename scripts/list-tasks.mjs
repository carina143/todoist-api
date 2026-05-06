import { printError, printJson, todoistRequest } from './_todoist-client.mjs';

function parseArgs(argv) {
  const args = { limit: 50 };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];

    if (arg === '--limit' && next) {
      args.limit = Number(next);
      i += 1;
    } else if (arg === '--cursor' && next) {
      args.cursor = next;
      i += 1;
    } else if (arg === '--project-id' && next) {
      args.project_id = next;
      i += 1;
    } else if (arg === '--section-id' && next) {
      args.section_id = next;
      i += 1;
    } else if (arg === '--label' && next) {
      args.label = next;
      i += 1;
    } else if (arg === '--filter' && next) {
      args.filter = next;
      i += 1;
    } else if (arg === '--ids' && next) {
      args.ids = next;
      i += 1;
    }
  }

  return args;
}

const options = parseArgs(process.argv.slice(2));

if (Number.isNaN(options.limit) || options.limit < 1 || options.limit > 200) {
  printError(new Error('limit_must_be_between_1_and_200'));
  process.exit(2);
}

try {
  const data = await todoistRequest({
    path: '/tasks',
    query: options
  });

  printJson({
    ok: true,
    query: options,
    count: Array.isArray(data?.results) ? data.results.length : 0,
    next_cursor: data?.next_cursor ?? null,
    tasks: data?.results ?? []
  });
} catch (error) {
  printError(error);
  process.exit(1);
}
