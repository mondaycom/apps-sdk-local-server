import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { BaseServerError } from 'errors/server/base-server-error';

export class ServiceUnavailableError extends BaseServerError {
  constructor(
    public message: string,
    stack?: string
  ) {
    const statusCode = StatusCodes.SERVICE_UNAVAILABLE;
    const reasonPhrase: ReasonPhrases = ReasonPhrases.SERVICE_UNAVAILABLE;
    super(message, statusCode, reasonPhrase, stack);
  }
}
