import { StatusCodes } from 'http-status-codes';

import { Logger } from 'utils/logger';

import type { RequestHandler } from 'express';
import type { IncomingHttpHeaders } from 'node:http';
import type { ZodSchema, typeToFlattenedError } from 'zod';

const logger = new Logger('schema-validation-middleware');

type RequestValidation<TParams, TQuery, TBody, IncomingHttpHeaders> = {
  params?: ZodSchema<TParams>;
  query?: ZodSchema<TQuery>;
  headers?: ZodSchema<IncomingHttpHeaders>;
  body?: ZodSchema<TBody>;
};

type ErrorListItem = { type: 'Query' | 'Params' | 'Body' | 'Headers'; errors: typeToFlattenedError<unknown> };

export const validateZodSchema: <TParams = unknown, TQuery = unknown, TBody = unknown>(
  schemas: RequestValidation<TParams, TQuery, TBody, IncomingHttpHeaders>,
  requestHandler: RequestHandler<TParams, unknown, TBody, TQuery>
) => RequestHandler<TParams, unknown, TBody, TQuery> =
  ({ params, query, body, headers }, requestHandler) =>
  async (req, res, next) => {
    const errors: Array<ErrorListItem> = [];

    if (params) {
      const parsed = params.safeParse(req.params);
      if (!parsed.success) {
        errors.push({ type: 'Params', errors: parsed.error.flatten() });
      }
    }
    if (query) {
      const parsed = query.safeParse(req.query);
      if (!parsed.success) {
        errors.push({ type: 'Query', errors: parsed.error.flatten() });
      } else {
        req.query = parsed.data;
      }
    }
    if (headers) {
      const parsed = headers.safeParse(req.headers);
      if (!parsed.success) {
        errors.push({ type: 'Headers', errors: parsed.error.flatten() });
      } else {
        req.headers = parsed.data;
      }
    }
    if (body) {
      const parsed = body.safeParse(req.body);
      if (!parsed.success) {
        errors.push({ type: 'Body', errors: parsed.error.flatten() });
      }
    }
    if (errors.length > 0) {
      const serializedErrors = errors.map((error) => {
        const key = error.type.toLowerCase() as 'body' | 'query' | 'params';
        return {
          type: error.type,
          errors: error.errors,
          data: req[key]
        };
      });

      logger.error({ errors: serializedErrors }, 'Request input validation failed with zod');
      return res.status(StatusCodes.BAD_REQUEST).send(serializedErrors);
    }

    await requestHandler(req, res, next);
  };
