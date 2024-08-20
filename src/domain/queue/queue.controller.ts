import { OperationId, Post, SuccessResponse } from '@tsoa/runtime';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Body, Route, Tags } from 'tsoa';

import { QueueService } from './queue.service';

import type {
  PublishMessageParams,
  PublishMessageResponse,
  ValidateSecretParams,
  ValidateSecretResponse
} from 'domain/queue/queue.types';

@Route('queue')
@Tags('Queue')
export class QueueController {
  @Post()
  @OperationId('publishMessage')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  public async publishMessage(@Body() body: PublishMessageParams): Promise<PublishMessageResponse> {
    const { message } = body;
    const id = QueueService.publishMessage(message);

    return { id };
  }

  @Post('validate-secret')
  @OperationId('validateSecret')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  public async validateSecret(@Body() body: ValidateSecretParams): Promise<ValidateSecretResponse> {
    const { secret } = body;
    const valid = QueueService.validateSecret(secret);

    return { valid };
  }
}
