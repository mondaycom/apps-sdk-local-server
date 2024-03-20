import { StatusCodes } from 'http-status-codes';

import { validateZodSchema } from 'middlewares/schema-validation.middleware';

import {
  deleteSecureValueRequestSchema,
  getSecureValueRequestSchema,
  updateSecureValueRequestSchema
} from './secure-storage.schema';
import * as SecureStorageService from './secure-storage.service';

export const getSecureValue = validateZodSchema(getSecureValueRequestSchema, async (req, res) => {
  const { key } = req.params;
  const value = SecureStorageService.getSecureValue(key);
  return res.status(StatusCodes.OK).json({ value });
});

export const deleteSecureValue = validateZodSchema(deleteSecureValueRequestSchema, async (req, res) => {
  const { key } = req.params;
  SecureStorageService.deleteSecureValue(key);
  return res.status(StatusCodes.NO_CONTENT).send();
});

export const updateSecureValue = validateZodSchema(updateSecureValueRequestSchema, async (req, res) => {
  const { key } = req.params;
  const { value } = req.body;
  SecureStorageService.setSecureValue(key, value);
  return res.status(StatusCodes.OK).json(value);
});
