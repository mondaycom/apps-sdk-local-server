import { TIME_IN_SECONDS } from 'utils/time-enum';

export const APP_SERVICE_URL = 'http://192.168.33.70:8080';
export const APP_SERVICE_QUEUE_ENDPOINT = '/mndy-queue';
export const QUEUE_RETRY_INTERVAL_IN_SECONDS =
  Number(process.env.QUEUE_RETRY_INTERVAL_IN_SECONDS) || TIME_IN_SECONDS.MINUTE * 10;
