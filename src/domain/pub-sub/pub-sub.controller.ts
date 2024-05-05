import { OperationId, Post, SuccessResponse } from '@tsoa/runtime';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Body, Route, Tags } from 'tsoa';

import { PubSubService } from './pub-sub.service';

import type { QueueRequestBody, ValidateSecretRequestBody } from 'domain/pub-sub/pub-sub.types';

@Route('queue')
@Tags('Queue')
export class PubSubController {
  @Post()
  @OperationId('publishMessage')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  public queue(@Body() body: QueueRequestBody) {
    const { message } = body;
    const id = PubSubService.publishMessage(message);

    return { id };

    // TODO:
    /**
     * Differences Identified:
     * Formal Response Body Type:
     * SIDECAR explicitly returns PublishMessageResponse.
     * TARGET returns { id } but does not explicitly use PublishMessageResponse.
     * Required Changes to TARGET:
     * Standardize Response Body Type:
     * Ensure the TARGET uses PublishMessageResponse as the formal response body type to maintain API consistency.
     */
  }

  @Post('validate-secret')
  @OperationId('validateSecret')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  public validateSecret(@Body() body: ValidateSecretRequestBody) {
    const { secret } = body;
    const valid = PubSubService.validateSecret(secret);

    return { valid };

    // TODO:
    /**
     * Differences Identified:
     * Formal Response Body Type:
     * SIDECAR explicitly returns ValidateSecretResponse.
     * TARGET returns { valid } but does not explicitly use ValidateSecretResponse.
     * Required Changes to TARGET:
     * Standardize Response Body Type:
     * Ensure the TARGET uses ValidateSecretResponse as the formal response body type for consistency.
     */
  }
}

// TODO: file and class names
