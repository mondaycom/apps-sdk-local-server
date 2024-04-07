import { BaseClientError, InternalServerError } from 'errors/index';
import { Logger } from 'utils/logger';

import type { ErrorRequestHandler } from 'express';

const logger = new Logger('error-middleware');

const errorConverter = (err: Error) => {
  let error = err;
  if (!(error instanceof BaseClientError)) {
    const message = error.message;
    error = new InternalServerError(message, err.stack);
  }

  return error as BaseClientError;
};

export const errorHandler: ErrorRequestHandler = (err, req, res) => {
  const convertedError = errorConverter(err);
  const { status, message } = convertedError;

  const response = {
    code: status,
    message,
    stack: convertedError.stack
  };

  logger.error(convertedError);

  res.status(status).send(response);
};
