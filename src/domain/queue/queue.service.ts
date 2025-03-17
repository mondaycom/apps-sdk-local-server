import { randomBytes } from 'node:crypto';

import fetch from 'node-fetch';
import { AsyncTask, SimpleIntervalJob, ToadScheduler } from 'toad-scheduler';
import { v4 as uuidv4 } from 'uuid';

import {
  APP_SERVICE_QUEUE_ENDPOINT,
  APP_SERVICE_URL,
  QUEUE_RETRY_INTERVAL_IN_SECONDS
} from 'domain/queue/queue.consts';
import { BadRequestError } from 'shared/errors';
import { generateBase64Secret } from 'utils/cipher';
import { Logger } from 'utils/logger';

const scheduler = new ToadScheduler();
const logger = new Logger('pub-sub-service');
const jobsStore = new Map<string, { taskId: string; retryCount: number }>();

const validateAppServiceUrl = () => {
  const appServiceUrl = APP_SERVICE_URL;
  if (!appServiceUrl) {
    throw new BadRequestError('PubSub is not available - Set `APP_SERVICE_URL` in docker-compose.yml');
  }
};

const handleTaskFailure = (taskSecret: string) => {
  incrementRetryCount(taskSecret);
  const { retryCount, taskId } = getTaskData(taskSecret);
  if (retryCount >= 9) {
    logger.error({ taskId }, 'Task failed and stopped after 9 retries');
    removeJobIdAndSecret(taskSecret);
    scheduler.removeById(taskId);
  }
};

const createNewTask = (message: string) => {
  const taskId = uuidv4();
  const taskSecret = generateBase64Secret(taskId + randomBytes(16).toString('hex')).toString();
  storeJobIdAndSecret(taskSecret, taskId);
  const task = new AsyncTask(
    taskId,
    async () => {
      const response = await fetch(`${APP_SERVICE_URL}/${APP_SERVICE_QUEUE_ENDPOINT}?secret=${taskSecret}`, {
        method: 'POST',

        body: JSON.stringify({ content: message }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        logger.error('Response to message sent to app-service is not 200', response.statusText);
        handleTaskFailure(taskSecret);
        return;
      }

      logger.info('Message received to app service');
      removeJobIdAndSecret(taskSecret);
      scheduler.stopById(taskId);
    },
    (error: Error) => {
      logger.error({ error }, 'Failed to send message to app service');
      handleTaskFailure(taskSecret);
    }
  );

  return { taskId, task, taskSecret };
};

const storeJobIdAndSecret = (taskSecret: string, taskId: string) => {
  jobsStore.set(taskSecret, { taskId, retryCount: 0 });
};

const incrementRetryCount = (taskSecret: string) => {
  const job = getTaskData(taskSecret);

  jobsStore.set(taskSecret, { ...job, retryCount: job.retryCount + 1 });
};

const getTaskData = (taskSecret: string) => {
  const job = jobsStore.get(taskSecret);
  if (!job) {
    throw new BadRequestError('Invalid task secret');
  }

  return job;
};

const removeJobIdAndSecret = (taskSecret: string) => {
  jobsStore.delete(taskSecret);
};

export class QueueService {
  static publishMessage(message: string) {
    validateAppServiceUrl();
    const { taskId, task } = createNewTask(message);
    const job = new SimpleIntervalJob({ seconds: QUEUE_RETRY_INTERVAL_IN_SECONDS, runImmediately: true }, task, {
      id: taskId,
      preventOverrun: true
    });

    scheduler.addSimpleIntervalJob(job);
    return taskId;
  }

  static validateSecret(secret: string) {
    validateAppServiceUrl();
    try {
      getTaskData(secret);
      return true;
    } catch (error) {
      return false;
    }
  }
}
