import { TIME_IN_SECONDS } from 'utils/time-enum';

export const APP_SERVICE_URL = process.env.PUB_SUB_DEV_APP_SERVICE_URL;
export const APP_SERVICE_QUEUE_ENDPOINT = '/mndy-queue';
export const QUEUE_RETRY_INTERVAL_IN_SECONDS =
  Number(process.env.PUB_SUB_RETRY_INTERVAL_IN_SECONDS) || TIME_IN_SECONDS.MINUTE * 10;
