import { Post, SuccessResponse } from '@tsoa/runtime';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Body, Route, Tags } from 'tsoa';

import { PubSubService } from './pub-sub.service';

import type { QueueRequestBody, ValidateSecretRequestBody } from 'domain/pub-sub/pub-sub.types';

@Route('pub-sub')
@Tags('PubSub')
export class PubSubController {
  @Post('queue')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  public queue(@Body() body: QueueRequestBody) {
    const { message } = body;
    const id = PubSubService.publishMessage(message);

    return { id };
  }

  @Post('validate-secret')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  public validateSecret(@Body() body: ValidateSecretRequestBody) {
    const { secret } = body;
    const valid = PubSubService.validateSecret(secret);

    return { valid };
  }
}
