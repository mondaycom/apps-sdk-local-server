import { UnauthorizedError } from 'errors/index';

import type { Request } from 'express';

export const getTokenFromHeader = (req: Request, headerKey: string): string => {
  const header = req.get(headerKey);
  if (!header) {
    throw new UnauthorizedError('Authorization header is missing');
  }

  const splitTokenHeader = header.split(' ');

  // If bearer was provided, return the token part else return the whole header
  return splitTokenHeader[1] ?? splitTokenHeader[0];
};
