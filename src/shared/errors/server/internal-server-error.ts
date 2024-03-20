import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { BaseServerError } from 'errors/server/base-server-error';

export class InternalServerError extends BaseServerError {
  constructor(
    public message: string,
    stack?: string
  ) {
    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    const reasonPhrase: ReasonPhrases = ReasonPhrases.INTERNAL_SERVER_ERROR;
    super(message, statusCode, reasonPhrase, stack);
  }
}
