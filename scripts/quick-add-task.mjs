import { printError, printJson, todoistRequest } from './_todoist-client.mjs';

function parseBoolean(value) {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return null;
}

function parseArgs(argv) {
  const args = {
    parse_labels: true
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];

    if (arg === '--text' && next) {
      args.text = next;
      i += 1;
    } else if (arg === '--note' && next) {
      args.note = next;
      i += 1;
    } else if (arg === '--auto-reminder' && next) {
      args.auto_reminder = parseBoolean(next);
      i += 1;
    } else if (arg === '--parse-labels' && next) {
      args.parse_labels = parseBoolean(next);
      i += 1;
    }
  }

  return args;
}

const options = parseArgs(process.argv.slice(2));

if (!options.text) {
  printError(new Error('missing_text'));
  process.exit(2);
}

if (options.auto_reminder === null) {
  printError(new Error('auto_reminder_must_be_true_or_false'));
  process.exit(2);
}

if (options.parse_labels === null) {
  printError(new Error('parse_labels_must_be_true_or_false'));
  process.exit(2);
}

try {
  const data = await todoistRequest({
    method: 'POST',
    path: '/tasks/quick',
    body: options
  });

  printJson({
    ok: true,
    task: data
  });
} catch (error) {
  printError(error);
  process.exit(1);
}
