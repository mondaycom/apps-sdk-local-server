import pino from 'pino';

export class Logger {
  readonly logger: pino.Logger;

  /**
   * @param tag - Will be added to every logged message
   */
  constructor(tag: string) {
    this.logger = pino({
      name: tag,
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true
        }
      }
    });
  }

  debug<T extends object | string>(obj: T, message?: string): void {
    this.logger.debug(obj, message);
  }

  error<T extends object | string>(obj: T, message?: string): void {
    this.logger.error(obj, message);
  }

  warn<T extends object | string>(obj: T, message?: string): void {
    this.logger.warn(obj, message);
  }

  info<T extends object | string>(obj: T, message?: string): void {
    this.logger.info(obj, message);
  }
}
