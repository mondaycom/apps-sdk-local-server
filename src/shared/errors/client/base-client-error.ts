import { BaseError } from 'errors/base-error';

import type { ReasonPhrases, StatusCodes } from 'http-status-codes';

export class BaseClientError extends BaseError {
  constructor(
    public message: string,
    public status: StatusCodes,
    public reasonPhrase: ReasonPhrases,
    public stack?: string
  ) {
    super(message);
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
