import { LogMethods } from 'domain/log/logs.consts';
import { Logger } from 'utils/logger';

const logger = new Logger('user-logs');

export const userLog = (method = LogMethods.INFO, message?: string, error?: string | object, params?: object) => {
  logger[method]({ ...params, ...(error && { error }) }, message);
};
