import { NotFoundError } from 'shared/errors';

import type { Handler } from 'express';

export const notFoundHandler: Handler = (_req, _res, next) => {
  const notFoundError = new NotFoundError('Route not found');
  next(notFoundError);
};
