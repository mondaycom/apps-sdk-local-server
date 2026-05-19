jest.mock('node-fetch', () => jest.fn());

import { buildQueueUrl } from 'domain/queue/queue.service';

describe('buildQueueUrl', () => {
  it('builds the queue endpoint without duplicate slashes when the app service URL has a trailing slash', () => {
    const url = buildQueueUrl('https://example.local/', 'task-secret');

    expect(url).toBe('https://example.local/mndy-queue?secret=task-secret');
  });

  it('encodes the task secret as a query parameter', () => {
    const url = buildQueueUrl('https://example.local', 'secret+/=');

    expect(url).toBe('https://example.local/mndy-queue?secret=secret%2B%2F%3D');
  });

  it('preserves app service URL path segments', () => {
    const url = buildQueueUrl('https://example.local/dev-server', 'task-secret');

    expect(url).toBe('https://example.local/dev-server/mndy-queue?secret=task-secret');
  });
});
