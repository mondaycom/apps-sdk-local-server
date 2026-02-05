/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TsoaRoute, fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { StorageController } from './domain/storage/storage.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SecureStorageController } from './domain/secure-storage/secure-storage.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SecretsController } from './domain/secrets/secrets.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SecretsTestController } from './domain/secrets/secrets-test.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { QueueController } from './domain/queue/queue.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ObjectStorageController } from './domain/object-storage/object-storage.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LogsController } from './domain/log/logs.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EnvironmentVariablesController } from './domain/environment-variables/environment-variables.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EnvironmentVariablesTestController } from './domain/environment-variables/environment-variables-test.controller.js';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';
import multer from 'multer';




// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "StorageDataContract": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"version":{"dataType":"string"},"value":{"dataType":"any","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "JsonDataContract": {
        "dataType": "refObject",
        "properties": {
            "value": {"dataType":"any","required":true},
        },
        "additionalProperties": false,
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
    "SetSecretForKeyRequestBody": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"value":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PublishMessageResponse": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PublishMessageParams": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ValidateSecretResponse": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"valid":{"dataType":"boolean","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ValidateSecretParams": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"secret":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BaseResponse": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"error":{"dataType":"string"},"success":{"dataType":"boolean","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UploadFileResponse": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"BaseResponse"},{"dataType":"nestedObjectLiteral","nestedProperties":{"fileUrl":{"dataType":"string"},"fileName":{"dataType":"string"}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DownloadFileResponse": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"BaseResponse"},{"dataType":"nestedObjectLiteral","nestedProperties":{"contentType":{"dataType":"string"},"content":{"dataType":"buffer"}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeleteFileResponse": {
        "dataType": "refAlias",
        "type": {"ref":"BaseResponse","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Record_string.string_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"string"},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FileInfo": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"metadata":{"ref":"Record_string.string_","required":true},"etag":{"dataType":"string","required":true},"lastModified":{"dataType":"datetime","required":true},"contentType":{"dataType":"string","required":true},"size":{"dataType":"double","required":true},"name":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ListFilesResponse": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"BaseResponse"},{"dataType":"nestedObjectLiteral","nestedProperties":{"nextPageToken":{"dataType":"string"},"files":{"dataType":"array","array":{"dataType":"refAlias","ref":"FileInfo"}}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetFileInfoResponse": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"BaseResponse"},{"dataType":"nestedObjectLiteral","nestedProperties":{"fileInfo":{"ref":"FileInfo"}}}],"validators":{}},
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
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"payload":{"ref":"Record_string.unknown_"},"error":{"dataType":"union","subSchemas":[{"dataType":"string"},{"ref":"Record_string.unknown_"}]},"message":{"dataType":"string","required":true},"method":{"ref":"LogMethods","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router,opts?:{multer?:ReturnType<typeof multer>}) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################

    const upload = opts?.multer ||  multer({"limits":{"fileSize":33554432}});

    
        app.get('/storage/:key',
            ...(fetchMiddlewares<RequestHandler>(StorageController)),
            ...(fetchMiddlewares<RequestHandler>(StorageController.prototype.getValue)),

            async function StorageController_getValue(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    key: {"in":"path","name":"key","required":true,"dataType":"string"},
                    shared: {"in":"query","name":"shared","required":true,"dataType":"boolean"},
                    accessToken: {"in":"header","name":"x-monday-access-token","required":true,"dataType":"string"},
                    notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    serverError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string"}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new StorageController();

              await templateService.apiHandler({
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

            async function StorageController_deleteValue(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    accessToken: {"in":"header","name":"x-monday-access-token","required":true,"dataType":"string"},
                    key: {"in":"path","name":"key","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new StorageController();

              await templateService.apiHandler({
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

            async function StorageController_updateValue(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    accessToken: {"in":"header","name":"x-monday-access-token","required":true,"dataType":"string"},
                    key: {"in":"path","name":"key","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"JsonDataContract"},
                    shared: {"in":"query","name":"shared","dataType":"boolean"},
                    previousVersion: {"in":"query","name":"previousVersion","dataType":"string"},
                    ttl: {"in":"query","name":"ttl","dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new StorageController();

              await templateService.apiHandler({
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

            async function StorageController_counterIncrement(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    accessToken: {"in":"header","name":"x-monday-access-token","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"IncrementStorageForKeyRequestBody"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new StorageController();

              await templateService.apiHandler({
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
        app.get('/storage/search/:term',
            ...(fetchMiddlewares<RequestHandler>(StorageController)),
            ...(fetchMiddlewares<RequestHandler>(StorageController.prototype.searchRecords)),

            async function StorageController_searchRecords(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    term: {"in":"path","name":"term","required":true,"dataType":"string"},
                    accessToken: {"in":"header","name":"x-monday-access-token","required":true,"dataType":"string"},
                    notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    serverError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string"}}},
                    cursor: {"in":"query","name":"cursor","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new StorageController();

              await templateService.apiHandler({
                methodName: 'searchRecords',
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

            async function SecureStorageController_getSecureValue(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    key: {"in":"path","name":"key","required":true,"dataType":"string"},
                    notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new SecureStorageController();

              await templateService.apiHandler({
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

            async function SecureStorageController_deleteSecureValue(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    key: {"in":"path","name":"key","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new SecureStorageController();

              await templateService.apiHandler({
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

            async function SecureStorageController_updateSecureValue(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    key: {"in":"path","name":"key","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"JsonDataContract"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new SecureStorageController();

              await templateService.apiHandler({
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

            async function SecretsController_getSecretForKey(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    name: {"in":"path","name":"name","required":true,"dataType":"string"},
                    notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new SecretsController();

              await templateService.apiHandler({
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
        app.get('/secrets',
            ...(fetchMiddlewares<RequestHandler>(SecretsController)),
            ...(fetchMiddlewares<RequestHandler>(SecretsController.prototype.getKeys)),

            async function SecretsController_getKeys(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new SecretsController();

              await templateService.apiHandler({
                methodName: 'getKeys',
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

            async function SecretsTestController_setSecretForKey(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    name: {"in":"path","name":"name","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"SetSecretForKeyRequestBody"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new SecretsTestController();

              await templateService.apiHandler({
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
            ...(fetchMiddlewares<RequestHandler>(QueueController)),
            ...(fetchMiddlewares<RequestHandler>(QueueController.prototype.publishMessage)),

            async function QueueController_publishMessage(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    body: {"in":"body","name":"body","required":true,"ref":"PublishMessageParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new QueueController();

              await templateService.apiHandler({
                methodName: 'publishMessage',
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
            ...(fetchMiddlewares<RequestHandler>(QueueController)),
            ...(fetchMiddlewares<RequestHandler>(QueueController.prototype.validateSecret)),

            async function QueueController_validateSecret(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    body: {"in":"body","name":"body","required":true,"ref":"ValidateSecretParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new QueueController();

              await templateService.apiHandler({
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
        app.post('/object-storage/files',
            upload.fields([{"name":"content","maxCount":1,"multiple":false}]),
            ...(fetchMiddlewares<RequestHandler>(ObjectStorageController)),
            ...(fetchMiddlewares<RequestHandler>(ObjectStorageController.prototype.uploadFile)),

            async function ObjectStorageController_uploadFile(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    serverError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string"}}},
                    badRequest: {"in":"res","name":"400","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    content: {"in":"formData","name":"content","dataType":"file"},
                    filename: {"in":"formData","name":"filename","dataType":"string"},
                    contentType: {"in":"formData","name":"contentType","dataType":"string"},
                    metadata: {"in":"formData","name":"metadata","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ObjectStorageController();

              await templateService.apiHandler({
                methodName: 'uploadFile',
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
        app.get('/object-storage/files/:filename',
            ...(fetchMiddlewares<RequestHandler>(ObjectStorageController)),
            ...(fetchMiddlewares<RequestHandler>(ObjectStorageController.prototype.downloadFile)),

            async function ObjectStorageController_downloadFile(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    filename: {"in":"path","name":"filename","required":true,"dataType":"string"},
                    serverError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string"}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ObjectStorageController();

              await templateService.apiHandler({
                methodName: 'downloadFile',
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
        app.delete('/object-storage/files/:filename',
            ...(fetchMiddlewares<RequestHandler>(ObjectStorageController)),
            ...(fetchMiddlewares<RequestHandler>(ObjectStorageController.prototype.deleteFile)),

            async function ObjectStorageController_deleteFile(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    filename: {"in":"path","name":"filename","required":true,"dataType":"string"},
                    serverError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string"}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ObjectStorageController();

              await templateService.apiHandler({
                methodName: 'deleteFile',
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
        app.get('/object-storage/files',
            ...(fetchMiddlewares<RequestHandler>(ObjectStorageController)),
            ...(fetchMiddlewares<RequestHandler>(ObjectStorageController.prototype.listFiles)),

            async function ObjectStorageController_listFiles(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    serverError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string"}}},
                    prefix: {"in":"query","name":"prefix","dataType":"string"},
                    maxResults: {"in":"query","name":"maxResults","dataType":"double"},
                    pageToken: {"in":"query","name":"pageToken","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ObjectStorageController();

              await templateService.apiHandler({
                methodName: 'listFiles',
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
        app.get('/object-storage/files/:filename/info',
            ...(fetchMiddlewares<RequestHandler>(ObjectStorageController)),
            ...(fetchMiddlewares<RequestHandler>(ObjectStorageController.prototype.getFileInfo)),

            async function ObjectStorageController_getFileInfo(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    filename: {"in":"path","name":"filename","required":true,"dataType":"string"},
                    serverError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string"}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ObjectStorageController();

              await templateService.apiHandler({
                methodName: 'getFileInfo',
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

            async function LogsController_writeLog(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    body: {"in":"body","name":"body","required":true,"ref":"WriteLogRequestBody"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new LogsController();

              await templateService.apiHandler({
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
        app.get('/environment-variables/:name',
            ...(fetchMiddlewares<RequestHandler>(EnvironmentVariablesController)),
            ...(fetchMiddlewares<RequestHandler>(EnvironmentVariablesController.prototype.getEnvironmentVariableForKey)),

            async function EnvironmentVariablesController_getEnvironmentVariableForKey(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    name: {"in":"path","name":"name","required":true,"dataType":"string"},
                    notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new EnvironmentVariablesController();

              await templateService.apiHandler({
                methodName: 'getEnvironmentVariableForKey',
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
        app.get('/environment-variables',
            ...(fetchMiddlewares<RequestHandler>(EnvironmentVariablesController)),
            ...(fetchMiddlewares<RequestHandler>(EnvironmentVariablesController.prototype.getKeys)),

            async function EnvironmentVariablesController_getKeys(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new EnvironmentVariablesController();

              await templateService.apiHandler({
                methodName: 'getKeys',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/test/environments/:name',
            ...(fetchMiddlewares<RequestHandler>(EnvironmentVariablesTestController)),
            ...(fetchMiddlewares<RequestHandler>(EnvironmentVariablesTestController.prototype.setEnvironmentForKey)),

            async function EnvironmentVariablesTestController_setEnvironmentForKey(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    name: {"in":"path","name":"name","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"JsonDataContract"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new EnvironmentVariablesTestController();

              await templateService.apiHandler({
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
