import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { BaseClientError } from 'errors/client/base-client-error';

export class ImplementationError extends BaseClientError {
  constructor(public message: string) {
    const statusCode = StatusCodes.NOT_IMPLEMENTED;
    const reasonPhrase: ReasonPhrases = ReasonPhrases.NOT_IMPLEMENTED;
    super(message, statusCode, reasonPhrase);
  }
}
