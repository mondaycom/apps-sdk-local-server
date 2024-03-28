/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TsoaRoute, fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { StorageController } from './domain/storage/storage.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SecureStorageController } from './domain/secure-storage/secure-storage.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SecretsController } from './domain/secrets/secrets.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SecretsTestController } from './domain/secrets/secrets-test.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PubSubController } from './domain/pub-sub/pub-sub.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LogsController } from './domain/log/logs.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EnvironmentController } from './domain/environment/environment.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EnvironmentTestController } from './domain/environment/environment-test.controller';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "JsonValue": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"},{"dataType":"boolean"},{"dataType":"enum","enums":[null]},{"dataType":"array","array":{"dataType":"refAlias","ref":"JsonValue"}},{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"ref":"JsonValue"}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SetStorageForKeyRequestBody": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"shared":{"dataType":"boolean"},"previousVersion":{"dataType":"string"},"value":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Period": {
        "dataType": "refEnum",
        "enums": ["DAILY","MONTHLY","YEARLY"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IncrementStorageForKeyRequestBody": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"kind":{"dataType":"string","required":true},"renewalDate":{"dataType":"datetime","required":true},"incrementBy":{"dataType":"double","required":true},"period":{"ref":"Period","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SetSecureStorageForKeyRequestBody": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"value":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SetSecretForKeyRequestBody": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"value":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "QueueRequestBody": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ValidateSecretRequestBody": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"secret":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LogMethods": {
        "dataType": "refEnum",
        "enums": ["debug","error","warn","info"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Record_string.unknown_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WriteLogRequestBody": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"params":{"ref":"Record_string.unknown_"},"error":{"dataType":"union","subSchemas":[{"dataType":"string"},{"ref":"Record_string.unknown_"}]},"message":{"dataType":"string"},"method":{"ref":"LogMethods","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SetEnvironmentForKeyRequestBody": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"value":{"ref":"JsonValue","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras"});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.get('/storage/:key',
            ...(fetchMiddlewares<RequestHandler>(StorageController)),
            ...(fetchMiddlewares<RequestHandler>(StorageController.prototype.getValue)),

            function StorageController_getValue(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    key: {"in":"path","name":"key","required":true,"dataType":"string"},
                    shared: {"in":"query","name":"shared","required":true,"dataType":"boolean"},
                    accessToken: {"in":"header","name":"x-monday-access-token","required":true,"dataType":"string"},
                    notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    serverError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string"}}},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new StorageController();

              templateService.apiHandler({
                methodName: 'getValue',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/storage/:key',
            ...(fetchMiddlewares<RequestHandler>(StorageController)),
            ...(fetchMiddlewares<RequestHandler>(StorageController.prototype.deleteValue)),

            function StorageController_deleteValue(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    accessToken: {"in":"header","name":"x-monday-access-token","required":true,"dataType":"string"},
                    key: {"in":"path","name":"key","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new StorageController();

              templateService.apiHandler({
                methodName: 'deleteValue',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/storage/:key',
            ...(fetchMiddlewares<RequestHandler>(StorageController)),
            ...(fetchMiddlewares<RequestHandler>(StorageController.prototype.updateValue)),

            function StorageController_updateValue(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    accessToken: {"in":"header","name":"x-monday-access-token","required":true,"dataType":"string"},
                    key: {"in":"path","name":"key","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"SetStorageForKeyRequestBody"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new StorageController();

              templateService.apiHandler({
                methodName: 'updateValue',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/storage/counter/increment',
            ...(fetchMiddlewares<RequestHandler>(StorageController)),
            ...(fetchMiddlewares<RequestHandler>(StorageController.prototype.counterIncrement)),

            function StorageController_counterIncrement(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    accessToken: {"in":"header","name":"x-monday-access-token","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"IncrementStorageForKeyRequestBody"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new StorageController();

              templateService.apiHandler({
                methodName: 'counterIncrement',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/secure-storage/:key',
            ...(fetchMiddlewares<RequestHandler>(SecureStorageController)),
            ...(fetchMiddlewares<RequestHandler>(SecureStorageController.prototype.getSecureValue)),

            function SecureStorageController_getSecureValue(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    key: {"in":"path","name":"key","required":true,"dataType":"string"},
                    notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new SecureStorageController();

              templateService.apiHandler({
                methodName: 'getSecureValue',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/secure-storage/:key',
            ...(fetchMiddlewares<RequestHandler>(SecureStorageController)),
            ...(fetchMiddlewares<RequestHandler>(SecureStorageController.prototype.deleteSecureValue)),

            function SecureStorageController_deleteSecureValue(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    key: {"in":"path","name":"key","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new SecureStorageController();

              templateService.apiHandler({
                methodName: 'deleteSecureValue',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/secure-storage/:key',
            ...(fetchMiddlewares<RequestHandler>(SecureStorageController)),
            ...(fetchMiddlewares<RequestHandler>(SecureStorageController.prototype.updateSecureValue)),

            function SecureStorageController_updateSecureValue(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    key: {"in":"path","name":"key","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"SetSecureStorageForKeyRequestBody"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new SecureStorageController();

              templateService.apiHandler({
                methodName: 'updateSecureValue',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/secrets/:name',
            ...(fetchMiddlewares<RequestHandler>(SecretsController)),
            ...(fetchMiddlewares<RequestHandler>(SecretsController.prototype.getSecretForKey)),

            function SecretsController_getSecretForKey(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    name: {"in":"path","name":"name","required":true,"dataType":"string"},
                    notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new SecretsController();

              templateService.apiHandler({
                methodName: 'getSecretForKey',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/test/secrets/:name',
            ...(fetchMiddlewares<RequestHandler>(SecretsTestController)),
            ...(fetchMiddlewares<RequestHandler>(SecretsTestController.prototype.setSecretForKey)),

            function SecretsTestController_setSecretForKey(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    name: {"in":"path","name":"name","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"SetSecretForKeyRequestBody"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new SecretsTestController();

              templateService.apiHandler({
                methodName: 'setSecretForKey',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/queue',
            ...(fetchMiddlewares<RequestHandler>(PubSubController)),
            ...(fetchMiddlewares<RequestHandler>(PubSubController.prototype.queue)),

            function PubSubController_queue(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    body: {"in":"body","name":"body","required":true,"ref":"QueueRequestBody"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PubSubController();

              templateService.apiHandler({
                methodName: 'queue',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/queue/validate-secret',
            ...(fetchMiddlewares<RequestHandler>(PubSubController)),
            ...(fetchMiddlewares<RequestHandler>(PubSubController.prototype.validateSecret)),

            function PubSubController_validateSecret(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    body: {"in":"body","name":"body","required":true,"ref":"ValidateSecretRequestBody"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PubSubController();

              templateService.apiHandler({
                methodName: 'validateSecret',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/logs',
            ...(fetchMiddlewares<RequestHandler>(LogsController)),
            ...(fetchMiddlewares<RequestHandler>(LogsController.prototype.writeLog)),

            function LogsController_writeLog(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    body: {"in":"body","name":"body","required":true,"ref":"WriteLogRequestBody"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new LogsController();

              templateService.apiHandler({
                methodName: 'writeLog',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/environments/:name',
            ...(fetchMiddlewares<RequestHandler>(EnvironmentController)),
            ...(fetchMiddlewares<RequestHandler>(EnvironmentController.prototype.getEnvironmentForKey)),

            function EnvironmentController_getEnvironmentForKey(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    name: {"in":"path","name":"name","required":true,"dataType":"string"},
                    notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new EnvironmentController();

              templateService.apiHandler({
                methodName: 'getEnvironmentForKey',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/test/environments/:name',
            ...(fetchMiddlewares<RequestHandler>(EnvironmentTestController)),
            ...(fetchMiddlewares<RequestHandler>(EnvironmentTestController.prototype.setEnvironmentForKey)),

            function EnvironmentTestController_setEnvironmentForKey(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    name: {"in":"path","name":"name","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"SetEnvironmentForKeyRequestBody"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new EnvironmentTestController();

              templateService.apiHandler({
                methodName: 'setEnvironmentForKey',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
