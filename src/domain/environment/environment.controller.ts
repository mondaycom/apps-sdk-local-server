import { StatusCodes } from 'http-status-codes';

import {
  getEnvironmentForKeyRequestSchema,
  setEnvironmentForKeyRequestSchema
} from 'domain/environment/environment.schema';
import { validateZodSchema } from 'middlewares/schema-validation.middleware';

import * as EnvironmentService from './environment.service';

export const getEnvironmentForKey = validateZodSchema(getEnvironmentForKeyRequestSchema, (req, res) => {
  const { key } = req.params;
  const value = EnvironmentService.getEnvironmentForKey(key);
  return res.status(StatusCodes.OK).json(value);
});

export const setEnvironmentForKey = validateZodSchema(setEnvironmentForKeyRequestSchema, (req, res) => {
  const { key } = req.params;
  const { value } = req.body;
  EnvironmentService.setEnvironmentForKey(key, value);
  return res.status(StatusCodes.NO_CONTENT).send();
});
