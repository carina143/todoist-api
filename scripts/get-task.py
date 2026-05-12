#!/usr/bin/env python3
"""
Fetch a single Todoist task by ID and print its full details as JSON.

Usage:
  python3 get-task.py <task_id> [--account <email>]

Args:
  task_id          Todoist task ID
  --account <email> Optional account email (defaults to first account in secrets.json)

Example:
  python3 get-task.py 6gXMGpMqp9C4g9h5
  python3 get-task.py 6gXMGpMqp9C4g9h5 --account carina.kraeutler@gmail.com
"""

import json
import pathlib
import sys
import urllib.request
import urllib.error
from typing import Optional


def load_secrets() -> dict:
    """Load Todoist API secrets from local secrets.json."""
    candidates = [
        pathlib.Path.home() / '.openclaw' / 'secrets.json',
        pathlib.Path(__file__).parent.parent / 'secrets.json',
        pathlib.Path.cwd() / 'secrets.json',
    ]
    
    for path in candidates:
        if path.exists():
            return json.loads(path.read_text('utf-8'))
    
    raise FileNotFoundError(f"secrets.json not found in any of: {[str(p) for p in candidates]}")


def resolve_account(secrets: dict, requested_account: Optional[str]) -> str:
    """Resolve the Todoist account email to use."""
    accounts = secrets.get('integrations', {}).get('todoist', {}).get('accounts', {})
    
    if not accounts:
        raise ValueError('No Todoist accounts configured in secrets.json')
    
    if requested_account:
        if requested_account not in accounts:
            raise ValueError(f'Account {requested_account} not found in secrets.json')
        return requested_account
    
    # Return first available account
    first_account = next(iter(accounts.keys()), None)
    if not first_account:
        raise ValueError('No Todoist accounts available')
    
    return first_account


def load_api_token(secrets: dict, account: str) -> str:
    """Load API token for the given account."""
    account_config = secrets['integrations']['todoist']['accounts'][account]
    
    # Try multiple field names for backwards compatibility
    token = (
        account_config.get('apiToken') or
        account_config.get('token') or
        account_config.get('accessToken')
    )
    
    if not token:
        raise ValueError(f'No API token found for account {account}')
    
    return token


def get_task(task_id: str, token: str) -> dict:
    """Fetch a task from Todoist API."""
    url = f'https://api.todoist.com/api/v1/tasks/{task_id}'
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
    
    req = urllib.request.Request(url, headers=headers, method='GET')
    
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        if e.code == 404:
            print(json.dumps({'error': 'task_not_found', 'task_id': task_id}, ensure_ascii=False), file=sys.stderr)
            sys.exit(1)
        elif e.code == 401:
            print(json.dumps({'error': 'unauthorized', 'message': 'Invalid or expired API token'}, ensure_ascii=False), file=sys.stderr)
            sys.exit(1)
        else:
            print(json.dumps({'error': f'http_{e.code}', 'message': str(e)}, ensure_ascii=False), file=sys.stderr)
            sys.exit(1)
    except Exception as e:
        print(json.dumps({'error': 'request_failed', 'message': str(e)}, ensure_ascii=False), file=sys.stderr)
        sys.exit(1)


def main():
    if len(sys.argv) < 2:
        print(__doc__, file=sys.stderr)
        sys.exit(1)
    
    task_id = sys.argv[1]
    account = None
    
    # Parse optional --account argument
    if '--account' in sys.argv:
        idx = sys.argv.index('--account')
        if idx + 1 < len(sys.argv):
            account = sys.argv[idx + 1]
    
    try:
        secrets = load_secrets()
        resolved_account = resolve_account(secrets, account)
        token = load_api_token(secrets, resolved_account)
        task = get_task(task_id, token)
        
        print(json.dumps({
            'ok': True,
            'task': task,
            'account': resolved_account
        }, indent=2, ensure_ascii=False))
        
    except Exception as e:
        print(json.dumps({
            'ok': False,
            'error': str(e)
        }, ensure_ascii=False), file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
