import type { NextFunction, Request, Response } from 'express';

/**
 * Middleware to handle multer file size limit errors
 * Converts LIMIT_FILE_SIZE errors to proper 413 responses
 */
export function multerErrorHandler(error: Error & { code?: string }, req: Request, res: Response, next: NextFunction) {
  if (error && error.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      success: false,
      error: 'File too large',
      reason: 'File size exceeds the maximum limit of 32MB'
    });
  }
  next(error);
}
