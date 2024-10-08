import { LogMethods } from 'domain/log/logs.consts';
import { Logger } from 'utils/logger';

const logger = new Logger('user-logs');

export class UserLogsService {
  static log(method = LogMethods.INFO, message?: string, error?: string | object) {
    logger[method]({ ...(error && { error }) }, message);
  }
}
