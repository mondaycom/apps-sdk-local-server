import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { BaseClientError } from 'errors/client/base-client-error';

export class UnauthorizedError extends BaseClientError {
  constructor(public message: string) {
    const statusCode = StatusCodes.UNAUTHORIZED;
    const reasonPhrase: ReasonPhrases = ReasonPhrases.UNAUTHORIZED;
    super(message, statusCode, reasonPhrase);
  }
}
