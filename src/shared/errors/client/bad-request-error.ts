import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { BaseClientError } from 'errors/client/base-client-error';

export class BadRequestError extends BaseClientError {
  constructor(public message: string) {
    const statusCode = StatusCodes.BAD_REQUEST;
    const reasonPhrase: ReasonPhrases = ReasonPhrases.BAD_REQUEST;
    super(message, statusCode, reasonPhrase);
  }
}
