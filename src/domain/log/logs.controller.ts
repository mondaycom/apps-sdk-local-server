import { OperationId, Post, SuccessResponse } from '@tsoa/runtime';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Body, Route, Tags } from 'tsoa';

import { UserLogsService } from 'domain/log/logs.service';

import type { WriteLogRequestBody } from 'domain/log/logs.types';

@Route('logs')
@Tags('Logs')
export class LogsController {
  @Post()
  @OperationId('writeLog')
  @SuccessResponse(StatusCodes.NO_CONTENT, ReasonPhrases.NO_CONTENT)
  public async writeLog(@Body() body: WriteLogRequestBody): Promise<void> {
    const { params, message, method, error } = body;
    UserLogsService.log(method, message, error, params);
  }

  // TODO:
  /**
   * Differences Identified:
   * Request Body:
   * SIDECAR accepts message, method, and error.
   * TARGET additionally accepts params.
   * Required Changes to TARGET:
   * Align Request Body:
   * Remove params from WriteLogRequestBody in TARGET to match the request body structure of SIDECAR.
   * Check for Path and Query Parameters:
   * Both implementations do not use path or query parameters in their current form. Ensure this remains consistent unless specified by functional requirements.
   * Align Response Definitions:
   * Both APIs provide the same response for successful execution (204 No Content). Ensure that error responses (if any defined elsewhere) are consistent in terms of HTTP status codes and response bodies.
   */
}

// TODO:
/**
 *
 */
