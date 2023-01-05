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
exports.JsonSchemaInputProcessor = void 0;
const AbstractInputProcessor_1 = require("./AbstractInputProcessor");
const json_schema_ref_parser_1 = __importDefault(require("@apidevtools/json-schema-ref-parser"));
const path_1 = __importDefault(require("path"));
const models_1 = require("../models");
const utils_1 = require("../utils");
const PostInterpreter_1 = require("../interpreter/PostInterpreter");
const Interpreter_1 = require("../interpreter/Interpreter");
/**
 * Class for processing JSON Schema
 */
class JsonSchemaInputProcessor extends AbstractInputProcessor_1.AbstractInputProcessor {
    /**
     * Function for processing a JSON Schema input.
     *
     * @param input
     */
    process(input) {
        if (this.shouldProcess(input)) {
            switch (input.$schema) {
                case 'http://json-schema.org/draft-04/schema':
                case 'http://json-schema.org/draft-04/schema#':
                    return this.processDraft4(input);
                case 'http://json-schema.org/draft-06/schema':
                case 'http://json-schema.org/draft-06/schema#':
                    return this.processDraft6(input);
                case 'http://json-schema.org/draft-07/schema#':
                case 'http://json-schema.org/draft-07/schema':
                default:
                    return this.processDraft7(input);
            }
        }
        return Promise.reject(new Error('Input is not a JSON Schema, so it cannot be processed.'));
    }
    /**
     * Unless the schema states one that is not supported we assume its of type JSON Schema
     *
     * @param input
     */
    shouldProcess(input) {
        if (input.$schema !== undefined) {
            if (input.$schema === 'http://json-schema.org/draft-04/schema#' ||
                input.$schema === 'http://json-schema.org/draft-04/schema' ||
                input.$schema === 'http://json-schema.org/draft-06/schema#' ||
                input.$schema === 'http://json-schema.org/draft-06/schema' ||
                input.$schema === 'http://json-schema.org/draft-07/schema#' ||
                input.$schema === 'http://json-schema.org/draft-07/schema') {
                return true;
            }
            return false;
        }
        return true;
    }
    /**
     * Process a draft-7 schema
     *
     * @param input to process as draft 7
     */
    processDraft7(input) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Logger.debug('Processing input as a JSON Schema Draft 7 document');
            const commonInputModel = new models_1.CommonInputModel();
            commonInputModel.originalInput = input;
            input = JsonSchemaInputProcessor.reflectSchemaNames(input, {}, 'root', true);
            yield this.dereferenceInputs(input);
            const parsedSchema = models_1.Draft7Schema.toSchema(input);
            commonInputModel.models = JsonSchemaInputProcessor.convertSchemaToCommonModel(parsedSchema);
            utils_1.Logger.debug('Completed processing input as JSON Schema draft 7 document');
            return commonInputModel;
        });
    }
    /**
     * Process a draft-4 schema
     *
     * @param input to process as draft 4
     */
    processDraft4(input) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Logger.debug('Processing input as JSON Schema Draft 4 document');
            const commonInputModel = new models_1.CommonInputModel();
            commonInputModel.originalInput = input;
            input = JsonSchemaInputProcessor.reflectSchemaNames(input, {}, 'root', true);
            yield this.dereferenceInputs(input);
            const parsedSchema = models_1.Draft4Schema.toSchema(input);
            commonInputModel.models = JsonSchemaInputProcessor.convertSchemaToCommonModel(parsedSchema);
            utils_1.Logger.debug('Completed processing input as JSON Schema draft 4 document');
            return commonInputModel;
        });
    }
    /**
     * Process a draft-6 schema
     *
     * @param input to process as draft-6
     */
    processDraft6(input) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Logger.debug('Processing input as a JSON Schema Draft 6 document');
            const commonInputModel = new models_1.CommonInputModel();
            commonInputModel.originalInput = input;
            input = JsonSchemaInputProcessor.reflectSchemaNames(input, {}, 'root', true);
            yield this.dereferenceInputs(input);
            const parsedSchema = models_1.Draft6Schema.toSchema(input);
            commonInputModel.models = JsonSchemaInputProcessor.convertSchemaToCommonModel(parsedSchema);
            utils_1.Logger.debug('Completed processing input as JSON Schema draft 6 document');
            return commonInputModel;
        });
    }
    dereferenceInputs(input) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Logger.debug('Dereferencing all $ref instances');
            const refParser = new json_schema_ref_parser_1.default;
            // eslint-disable-next-line no-undef
            const localPath = `${process.cwd()}${path_1.default.sep}`;
            const deRefOption = {
                continueOnError: true,
                dereference: { circular: true },
            };
            utils_1.Logger.debug(`Trying to dereference all $ref instances from input, using option ${JSON.stringify(deRefOption)}.`);
            try {
                yield refParser.dereference(localPath, input, deRefOption);
            }
            catch (e) {
                const errorMessage = `Could not dereference $ref in input, is all the references correct? ${e.message}`;
                utils_1.Logger.error(errorMessage, e);
                throw new Error(errorMessage);
            }
            utils_1.Logger.debug('Successfully dereferenced all $ref instances from input.', input);
        });
    }
    /**
     * Each schema must have a name, so when later interpreted, the model have the most accurate model name.
     *
     * Reflect name from given schema and save it to `x-modelgen-inferred-name` extension.
     *
     * This reflects all the common keywords that are shared between draft-4, draft-7 and Swagger 2.0 Schema
     *
     * @param schema to process
     * @param namesStack is a aggegator of previous used names
     * @param name to infer
     * @param isRoot indicates if performed schema is a root schema
     */
    // eslint-disable-next-line sonarjs/cognitive-complexity
    static reflectSchemaNames(schema, namesStack, name, isRoot) {
        if (typeof schema === 'boolean') {
            return schema;
        }
        schema = Object.assign({}, schema);
        if (isRoot) {
            namesStack[String(name)] = 0;
            schema[this.MODELGEN_INFFERED_NAME] = name;
            name = '';
        }
        else if (name && !schema[this.MODELGEN_INFFERED_NAME]) {
            let occurrence = namesStack[String(name)];
            if (occurrence === undefined) {
                namesStack[String(name)] = 0;
            }
            else {
                occurrence++;
            }
            const inferredName = occurrence ? `${name}_${occurrence}` : name;
            schema[this.MODELGEN_INFFERED_NAME] = inferredName;
        }
        if (schema.allOf !== undefined) {
            schema.allOf = schema.allOf.map((item, idx) => this.reflectSchemaNames(item, namesStack, this.ensureNamePattern(name, 'allOf', idx)));
        }
        if (schema.oneOf !== undefined) {
            schema.oneOf = schema.oneOf.map((item, idx) => this.reflectSchemaNames(item, namesStack, this.ensureNamePattern(name, 'oneOf', idx)));
        }
        if (schema.anyOf !== undefined) {
            schema.anyOf = schema.anyOf.map((item, idx) => this.reflectSchemaNames(item, namesStack, this.ensureNamePattern(name, 'anyOf', idx)));
        }
        if (schema.not !== undefined) {
            schema.not = this.reflectSchemaNames(schema.not, namesStack, this.ensureNamePattern(name, 'not'));
        }
        if (typeof schema.additionalItems === 'object' &&
            schema.additionalItems !== undefined) {
            schema.additionalItems = this.reflectSchemaNames(schema.additionalItems, namesStack, this.ensureNamePattern(name, 'additionalItem'));
        }
        if (typeof schema.additionalProperties === 'object' &&
            schema.additionalProperties !== undefined) {
            schema.additionalProperties = this.reflectSchemaNames(schema.additionalProperties, namesStack, this.ensureNamePattern(name, 'additionalProperty'));
        }
        if (schema.items !== undefined) {
            if (Array.isArray(schema.items)) {
                schema.items = schema.items.map((item, idx) => this.reflectSchemaNames(item, namesStack, this.ensureNamePattern(name, 'item', idx)));
            }
            else {
                schema.items = this.reflectSchemaNames(schema.items, namesStack, this.ensureNamePattern(name, 'item'));
            }
        }
        if (schema.properties !== undefined) {
            const properties = {};
            for (const [propertyName, propertySchema] of Object.entries(schema.properties)) {
                properties[String(propertyName)] = this.reflectSchemaNames(propertySchema, namesStack, this.ensureNamePattern(name, propertyName));
            }
            schema.properties = properties;
        }
        if (schema.dependencies !== undefined) {
            const dependencies = {};
            for (const [dependencyName, dependency] of Object.entries(schema.dependencies)) {
                if (typeof dependency === 'object' && !Array.isArray(dependency)) {
                    dependencies[String(dependencyName)] = this.reflectSchemaNames(dependency, namesStack, this.ensureNamePattern(name, dependencyName));
                }
                else {
                    dependencies[String(dependencyName)] = dependency;
                }
            }
            schema.dependencies = dependencies;
        }
        if (schema.patternProperties !== undefined) {
            const patternProperties = {};
            for (const [idx, [patternPropertyName, patternProperty]] of Object.entries(Object.entries(schema.patternProperties))) {
                patternProperties[String(patternPropertyName)] = this.reflectSchemaNames(patternProperty, namesStack, this.ensureNamePattern(name, 'pattern_property', idx));
            }
            schema.patternProperties = patternProperties;
        }
        if (schema.definitions !== undefined) {
            const definitions = {};
            for (const [definitionName, definition] of Object.entries(schema.definitions)) {
                definitions[String(definitionName)] = this.reflectSchemaNames(definition, namesStack, this.ensureNamePattern(name, definitionName));
            }
            schema.definitions = definitions;
        }
        if (!(schema instanceof models_1.Draft4Schema)) {
            //Keywords introduced in draft 6
            if (schema.contains !== undefined) {
                schema.contains = this.reflectSchemaNames(schema.contains, namesStack, this.ensureNamePattern(name, 'contain'));
            }
            if (schema.propertyNames !== undefined) {
                schema.propertyNames = this.reflectSchemaNames(schema.propertyNames, namesStack, this.ensureNamePattern(name, 'propertyName'));
            }
            if (!(schema instanceof models_1.Draft6Schema)) {
                //Keywords introduced in Draft 7
                if (schema.if !== undefined) {
                    schema.if = this.reflectSchemaNames(schema.if, namesStack, this.ensureNamePattern(name, 'if'));
                }
                if (schema.then !== undefined) {
                    schema.then = this.reflectSchemaNames(schema.then, namesStack, this.ensureNamePattern(name, 'then'));
                }
                if (schema.else !== undefined) {
                    schema.else = this.reflectSchemaNames(schema.else, namesStack, this.ensureNamePattern(name, 'else'));
                }
            }
        }
        return schema;
    }
    /**
     * Ensure schema name using previous name and new part
     *
     * @param previousName to concatenate with
     * @param newParts
     */
    static ensureNamePattern(previousName, ...newParts) {
        const pattern = newParts.map(part => `${part}`).join('_');
        if (!previousName) {
            return pattern;
        }
        return `${previousName}_${pattern}`;
    }
    /**
     * Simplifies a JSON Schema into a common models
     *
     * @param schema to simplify to common model
     */
    static convertSchemaToCommonModel(schema) {
        const commonModelsMap = {};
        const interpreter = new Interpreter_1.Interpreter();
        const model = interpreter.interpret(schema);
        if (model !== undefined) {
            const commonModels = (0, PostInterpreter_1.postInterpretModel)(model);
            for (const commonModel of commonModels) {
                if (commonModel.$id) {
                    if (commonModelsMap[commonModel.$id] !== undefined) {
                        utils_1.Logger.warn(`Overwriting existing model with $id ${commonModel.$id}, are there two models with the same id present?`, commonModel);
                    }
                    commonModelsMap[commonModel.$id] = commonModel;
                }
                else if (commonModel.unionType) {
                    for (const [typeName, unionTypeModel] of Object.entries(commonModel.unionType)) {
                        commonModelsMap[String(typeName)] = unionTypeModel;
                    }
                }
                else {
                    utils_1.Logger.warn('Model did not have $id, ignoring.', commonModel);
                }
            }
        }
        return commonModelsMap;
    }
}
exports.JsonSchemaInputProcessor = JsonSchemaInputProcessor;
//# sourceMappingURL=JsonSchemaInputProcessor.js.map