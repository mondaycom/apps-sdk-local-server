import { Post, SuccessResponse } from '@tsoa/runtime';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Body, Route, Tags } from 'tsoa';

import { UserLogsService } from 'domain/log/logs.service';

import type { WriteLogRequestBody } from 'domain/log/logs.types';

@Route('logs')
@Tags('Logs')
export class LogsController {
  @Post()
  @SuccessResponse(StatusCodes.NO_CONTENT, ReasonPhrases.NO_CONTENT)
  public async writeLog(@Body() body: WriteLogRequestBody): Promise<void> {
    const { params, message, method, error } = body;
    UserLogsService.log(method, message, error, params);
  }
}
