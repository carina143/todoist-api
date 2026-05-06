import { assertServerId, printError, printJson, todoistRequest } from './_todoist-client.mjs';

const taskId = process.argv[2];

try {
  const data = await todoistRequest({
    path: `/tasks/${assertServerId(taskId, 'task_id')}`
  });

  printJson({
    ok: true,
    task: data
  });
} catch (error) {
  printError(error);
  process.exit(1);
}
