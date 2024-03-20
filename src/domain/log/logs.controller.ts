import { StatusCodes } from 'http-status-codes';

import { validateZodSchema } from 'middlewares/schema-validation.middleware';

import { writeLogRequestSchema } from './logs.schema';
import * as LogService from './logs.service';

export const writeLog = validateZodSchema(writeLogRequestSchema, (req, res) => {
  const { params, message, method, error } = req.body;
  LogService.userLog(method, message, error, params);

  return res.status(StatusCodes.NO_CONTENT).json();
});
