import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { BaseClientError } from 'errors/client/base-client-error';

export class NotFoundError extends BaseClientError {
  constructor(public message: string) {
    const statusCode = StatusCodes.NOT_FOUND;
    const reasonPhrase: ReasonPhrases = ReasonPhrases.NOT_FOUND;
    super(message, statusCode, reasonPhrase);
  }
}
