"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerInputProcessor = void 0;
const AbstractInputProcessor_1 = require("./AbstractInputProcessor");
const JsonSchemaInputProcessor_1 = require("./JsonSchemaInputProcessor");
const models_1 = require("../models");
const utils_1 = require("../utils");
const swagger_parser_1 = __importDefault(require("@apidevtools/swagger-parser"));
/**
 * Class for processing Swagger inputs
 */
class SwaggerInputProcessor extends AbstractInputProcessor_1.AbstractInputProcessor {
    /**
     * Process the input as a Swagger document
     *
     * @param input
     */
    process(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.shouldProcess(input)) {
                throw new Error('Input is not a Swagger document so it cannot be processed.');
            }
            utils_1.Logger.debug('Processing input as a Swagger document');
            const common = new models_1.CommonInputModel();
            common.originalInput = input;
            //Since we require that all references have been dereferenced, we cannot "simply" support already parsed inputs.
            const api = yield swagger_parser_1.default.dereference(input);
            for (const [path, pathObject] of Object.entries(api.paths)) {
                //Remove all special chars from path
                let formattedPathName = path.replace(/[^\w\s*]+/g, '');
                //Remove any pre-pending '/'
                formattedPathName = formattedPathName.replace(/\//, '');
                //Replace all segment separators '/'
                formattedPathName = formattedPathName.replace(/\//gm, '_');
                this.processOperation(pathObject.get, `${formattedPathName}_get`, common);
                this.processOperation(pathObject.put, `${formattedPathName}_put`, common);
                this.processOperation(pathObject.post, `${formattedPathName}_post`, common);
                this.processOperation(pathObject.options, `${formattedPathName}_options`, common);
                this.processOperation(pathObject.head, `${formattedPathName}_head`, common);
                this.processOperation(pathObject.patch, `${formattedPathName}_patch`, common);
            }
            return common;
        });
    }
    processOperation(operation, path, inputModel) {
        if (operation) {
            this.includeResponses(operation.responses, path, inputModel);
            this.includeParameters(operation.parameters, path, inputModel);
        }
    }
    includeResponses(responses, path, inputModel) {
        for (const [responseName, response] of Object.entries(responses)) {
            if (response !== undefined) {
                const getOperationResponseSchema = response.schema;
                if (getOperationResponseSchema !== undefined) {
                    const swaggerSchema = SwaggerInputProcessor.convertToInternalSchema(getOperationResponseSchema, `${path}_${responseName}`);
                    const commonModels = JsonSchemaInputProcessor_1.JsonSchemaInputProcessor.convertSchemaToCommonModel(swaggerSchema);
                    inputModel.models = Object.assign(Object.assign({}, inputModel.models), commonModels);
                }
            }
        }
    }
    includeParameters(parameters, path, inputModel) {
        for (const parameterObject of parameters || []) {
            const parameter = parameterObject;
            if (parameter.in === 'body') {
                const bodyParameterSchema = parameter.schema;
                const swaggerSchema = SwaggerInputProcessor.convertToInternalSchema(bodyParameterSchema, `${path}_body`);
                const commonModels = JsonSchemaInputProcessor_1.JsonSchemaInputProcessor.convertSchemaToCommonModel(swaggerSchema);
                inputModel.models = Object.assign(Object.assign({}, inputModel.models), commonModels);
            }
        }
    }
    /**
     * Converts a Swagger 2.0 Schema to the internal schema format.
     *
     * @param schema to convert
     * @param name of the schema
     */
    static convertToInternalSchema(schema, name) {
        schema = JsonSchemaInputProcessor_1.JsonSchemaInputProcessor.reflectSchemaNames(schema, {}, name, true);
        return models_1.SwaggerV2Schema.toSchema(schema);
    }
    /**
       * Figures out if an object is of type Swagger document and supported
       *
       * @param input
       */
    shouldProcess(input) {
        const version = this.tryGetVersionOfDocument(input);
        if (!version) {
            return false;
        }
        return SwaggerInputProcessor.supportedVersions.includes(version);
    }
    /**
     * Try to find the swagger version from the input. If it cannot, undefined are returned, if it can, the version is returned.
     *
     * @param input
     */
    tryGetVersionOfDocument(input) {
        return input && input.swagger;
    }
}
exports.SwaggerInputProcessor = SwaggerInputProcessor;
SwaggerInputProcessor.supportedVersions = ['2.0'];
//# sourceMappingURL=SwaggerInputProcessor.js.map