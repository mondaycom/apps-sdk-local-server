import { OperationId, Post, SuccessResponse } from '@tsoa/runtime';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Body, Route, Tags } from 'tsoa';

import { QueueService } from './queue.service';

import type { QueueRequestBody, ValidateSecretRequestBody } from 'domain/queue/queue.types';

@Route('queue')
@Tags('Queue')
export class QueueController {
  @Post()
  @OperationId('publishMessage')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  public publishMessage(@Body() body: QueueRequestBody) {
    const { message } = body;
    const id = QueueService.publishMessage(message);

    return { id };
  }

  @Post('validate-secret')
  @OperationId('validateSecret')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  public validateSecret(@Body() body: ValidateSecretRequestBody) {
    const { secret } = body;
    const valid = QueueService.validateSecret(secret);

    return { valid };
  }
}
