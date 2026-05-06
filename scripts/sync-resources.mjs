import { printError, printJson, todoistSync } from './_todoist-client.mjs';

function parseResources(value) {
  if (!value) {
    return ['projects', 'items', 'sections', 'labels'];
  }

  const normalized = String(value).trim();
  if (!normalized) {
    return ['projects', 'items', 'sections', 'labels'];
  }

  if (normalized.startsWith('[')) {
    return JSON.parse(normalized);
  }

  return normalized
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseArgs(argv) {
  const args = {
    syncToken: '*',
    resourceTypes: ['projects', 'items', 'sections', 'labels']
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];

    if (arg === '--sync-token' && next) {
      args.syncToken = next;
      i += 1;
    } else if (arg === '--resources' && next) {
      args.resourceTypes = parseResources(next);
      i += 1;
    }
  }

  return args;
}

const options = parseArgs(process.argv.slice(2));

try {
  const data = await todoistSync(options);

  printJson({
    ok: true,
    requested: options,
    sync_token: data?.sync_token ?? null,
    full_sync: data?.full_sync ?? null,
    resource_keys: Object.keys(data ?? {}).filter((key) => key !== 'sync_token'),
    data
  });
} catch (error) {
  printError(error);
  process.exit(1);
}
