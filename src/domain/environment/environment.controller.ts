import { OperationId, Res, SuccessResponse } from '@tsoa/runtime';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Get, Path, Route, Tags } from 'tsoa';

import { EnvironmentService } from './environment.service';

import type { TsoaResponse } from '@tsoa/runtime';

@Route('environments')
@Tags('Environment')
export class EnvironmentController {
  @Get('{name}')
  @OperationId('getEnvironment')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  public async getEnvironmentForKey(
    @Path() name: string,
    @Res() notFoundResponse: TsoaResponse<404, { reason: string }>
  ): Promise<unknown> {
    const value = EnvironmentService.getEnvironmentForKey(name);
    if (!value) {
      return notFoundResponse(404, { reason: 'Environment variable not found' });
    }

    return value;
  }

  // TODO:
  /**
   * Differences Identified:
   * Endpoint Path Difference:
   * SIDECAR uses /environment-variables/{name}
   * TARGET uses /environments/{name}
   * OperationId Difference:
   * SIDECAR: getEnvironmentVariable
   * TARGET: getEnvironment
   * Return Type:
   * SIDECAR explicitly returns a string.
   * TARGET returns an unknown type.
   * Required Changes to TARGET:
   * Align Endpoint Path:
   * Change the endpoint path in TARGET from /environments/{name} to /environment-variables/{name} to match SIDECAR.
   * Standardize OperationId:
   * Update the OperationId in TARGET to getEnvironmentVariable to maintain consistency with SIDECAR.
   * Standardize Return Type:
   * Change the return type in the TARGET from unknown to string to align with the explicit type definition in SIDECAR.
   */
}

// TODO:
/**
 * Required Changes to TARGET:
 * Add Missing Endpoint:
 * Implement the /environments GET endpoint in TARGET to retrieve all environment variable keys.
 * Define the operation as getEnvironmentVariableKeys with a 200 response returning an array of strings.
 */
