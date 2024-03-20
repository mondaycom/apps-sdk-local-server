import { StatusCodes } from 'http-status-codes';

import { validateZodSchema } from 'middlewares/schema-validation.middleware';

import { getSecretForKeyRequestSchema, setSecretForKeyRequestSchema } from './secrets.schema';
import * as SecretService from './secrets.service';

export const getSecretForKey = validateZodSchema(getSecretForKeyRequestSchema, (req, res) => {
  const { key } = req.params;
  const value = SecretService.getSecretForKey(key);
  return res.status(StatusCodes.OK).json(value);
});

export const setSecretForKey = validateZodSchema(setSecretForKeyRequestSchema, (req, res) => {
  const { key } = req.params;
  const { value } = req.body;
  SecretService.setSecretForKey(key, value);
  return res.status(StatusCodes.NO_CONTENT).send();
});
