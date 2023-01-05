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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncAPIInputProcessor = void 0;
const parser_1 = require("@asyncapi/parser");
const AbstractInputProcessor_1 = require("./AbstractInputProcessor");
const JsonSchemaInputProcessor_1 = require("./JsonSchemaInputProcessor");
const models_1 = require("../models");
const utils_1 = require("../utils");
const AsyncapiV2Schema_1 = require("../models/AsyncapiV2Schema");
/**
 * Class for processing AsyncAPI inputs
 */
class AsyncAPIInputProcessor extends AbstractInputProcessor_1.AbstractInputProcessor {
    /**
     * Process the input as an AsyncAPI document
     *
     * @param input
     */
    process(input, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.shouldProcess(input)) {
                throw new Error('Input is not an AsyncAPI document so it cannot be processed.');
            }
            utils_1.Logger.debug('Processing input as an AsyncAPI document');
            let doc;
            const common = new models_1.CommonInputModel();
            if (!AsyncAPIInputProcessor.isFromParser(input)) {
                doc = yield (0, parser_1.parse)(input, (options === null || options === void 0 ? void 0 : options.asyncapi) || {});
            }
            else {
                doc = input;
            }
            common.originalInput = doc;
            for (const [, message] of doc.allMessages()) {
                const schema = AsyncAPIInputProcessor.convertToInternalSchema(message.payload());
                const commonModels = JsonSchemaInputProcessor_1.JsonSchemaInputProcessor.convertSchemaToCommonModel(schema);
                common.models = Object.assign(Object.assign({}, common.models), commonModels);
            }
            return common;
        });
    }
    /**
     *
     * Reflect the name of the schema and save it to `x-modelgen-inferred-name` extension.
     *
     * This keeps the the id of the model deterministic if used in conjunction with other AsyncAPI tools such as the generator.
     *
     * @param schema to reflect name for
     */
    // eslint-disable-next-line sonarjs/cognitive-complexity
    static convertToInternalSchema(schema, alreadyIteratedSchemas = new Map()) {
        if (typeof schema === 'boolean') {
            return schema;
        }
        const schemaUid = schema.uid();
        if (alreadyIteratedSchemas.has(schemaUid)) {
            return alreadyIteratedSchemas.get(schemaUid);
        }
        const convertedSchema = Object.assign(new AsyncapiV2Schema_1.AsyncapiV2Schema(), schema.json());
        convertedSchema[this.MODELGEN_INFFERED_NAME] = schemaUid;
        alreadyIteratedSchemas.set(schemaUid, convertedSchema);
        if (schema.allOf() !== null) {
            convertedSchema.allOf = schema.allOf().map((item) => this.convertToInternalSchema(item, alreadyIteratedSchemas));
        }
        if (schema.oneOf() !== null) {
            convertedSchema.oneOf = schema.oneOf().map((item) => this.convertToInternalSchema(item, alreadyIteratedSchemas));
        }
        if (schema.anyOf() !== null) {
            convertedSchema.anyOf = schema.anyOf().map((item) => this.convertToInternalSchema(item, alreadyIteratedSchemas));
        }
        if (schema.not() !== null) {
            convertedSchema.not = this.convertToInternalSchema(schema.not(), alreadyIteratedSchemas);
        }
        if (typeof schema.additionalItems() === 'object' &&
            schema.additionalItems() !== null) {
            convertedSchema.additionalItems = this.convertToInternalSchema(schema.additionalItems(), alreadyIteratedSchemas);
        }
        if (schema.contains() !== null) {
            convertedSchema.contains = this.convertToInternalSchema(schema.contains(), alreadyIteratedSchemas);
        }
        if (schema.propertyNames() !== null) {
            convertedSchema.propertyNames = this.convertToInternalSchema(schema.propertyNames(), alreadyIteratedSchemas);
        }
        if (schema.if() !== null) {
            convertedSchema.if = this.convertToInternalSchema(schema.if(), alreadyIteratedSchemas);
        }
        if (schema.then() !== null) {
            convertedSchema.then = this.convertToInternalSchema(schema.then(), alreadyIteratedSchemas);
        }
        if (schema.else() !== null) {
            convertedSchema.else = this.convertToInternalSchema(schema.else(), alreadyIteratedSchemas);
        }
        if (typeof schema.additionalProperties() === 'object' &&
            schema.additionalProperties() !== null) {
            convertedSchema.additionalProperties = this.convertToInternalSchema(schema.additionalProperties(), alreadyIteratedSchemas);
        }
        if (schema.items() !== null) {
            if (Array.isArray(schema.items())) {
                convertedSchema.items = schema.items().map((item) => this.convertToInternalSchema(item), alreadyIteratedSchemas);
            }
            else {
                convertedSchema.items = this.convertToInternalSchema(schema.items(), alreadyIteratedSchemas);
            }
        }
        if (schema.properties() !== null && Object.keys(schema.properties()).length) {
            const properties = {};
            for (const [propertyName, propertySchema] of Object.entries(schema.properties())) {
                properties[String(propertyName)] = this.convertToInternalSchema(propertySchema, alreadyIteratedSchemas);
            }
            convertedSchema.properties = properties;
        }
        if (schema.dependencies() !== null && Object.keys(schema.dependencies()).length) {
            const dependencies = {};
            for (const [dependencyName, dependency] of Object.entries(schema.dependencies())) {
                if (typeof dependency === 'object' && !Array.isArray(dependency)) {
                    dependencies[String(dependencyName)] = this.convertToInternalSchema(dependency, alreadyIteratedSchemas);
                }
                else {
                    dependencies[String(dependencyName)] = dependency;
                }
            }
            convertedSchema.dependencies = dependencies;
        }
        if (schema.patternProperties() !== null && Object.keys(schema.patternProperties()).length) {
            const patternProperties = {};
            for (const [patternPropertyName, patternProperty] of Object.entries(schema.patternProperties())) {
                patternProperties[String(patternPropertyName)] = this.convertToInternalSchema(patternProperty, alreadyIteratedSchemas);
            }
            convertedSchema.patternProperties = patternProperties;
        }
        if (schema.definitions() !== null && Object.keys(schema.definitions()).length) {
            const definitions = {};
            for (const [definitionName, definition] of Object.entries(schema.definitions())) {
                definitions[String(definitionName)] = this.convertToInternalSchema(definition, alreadyIteratedSchemas);
            }
            convertedSchema.definitions = definitions;
        }
        return convertedSchema;
    }
    /**
       * Figures out if an object is of type AsyncAPI document
       *
       * @param input
       */
    shouldProcess(input) {
        const version = this.tryGetVersionOfDocument(input);
        if (!version) {
            return false;
        }
        return AsyncAPIInputProcessor.supportedVersions.includes(version);
    }
    /**
     * Try to find the AsyncAPI version from the input. If it cannot undefined are returned, if it can, the version is returned.
     *
     * @param input
     */
    tryGetVersionOfDocument(input) {
        if (AsyncAPIInputProcessor.isFromParser(input)) {
            return input.version();
        }
        return input && input.asyncapi;
    }
    /**
     * Figure out if input is from the AsyncAPI js parser.
     *
     * @param input
     */
    static isFromParser(input) {
        if (input['_json'] !== undefined && input['_json'].asyncapi !== undefined &&
            typeof input.version === 'function') {
            return true;
        }
        return false;
    }
}
exports.AsyncAPIInputProcessor = AsyncAPIInputProcessor;
AsyncAPIInputProcessor.supportedVersions = ['2.0.0', '2.1.0', '2.2.0', '2.3.0', '2.4.0'];
//# sourceMappingURL=AsyncAPIInputProcessor.js.map