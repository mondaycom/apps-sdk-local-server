import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { BaseClientError } from 'errors/client/base-client-error';

export class ForbiddenError extends BaseClientError {
  constructor(public message: string) {
    const statusCode = StatusCodes.FORBIDDEN;
    const reasonPhrase: ReasonPhrases = ReasonPhrases.FORBIDDEN;
    super(message, statusCode, reasonPhrase);
  }
}
