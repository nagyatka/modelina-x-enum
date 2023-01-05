"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interpreter = void 0;
const models_1 = require("../models");
const Utils_1 = require("./Utils");
const InterpretProperties_1 = __importDefault(require("./InterpretProperties"));
const InterpretAllOf_1 = __importDefault(require("./InterpretAllOf"));
const InterpretConst_1 = __importDefault(require("./InterpretConst"));
const InterpretEnum_1 = __importDefault(require("./InterpretEnum"));
const InterpretAdditionalProperties_1 = __importDefault(require("./InterpretAdditionalProperties"));
const InterpretItems_1 = __importDefault(require("./InterpretItems"));
const InterpretPatternProperties_1 = __importDefault(require("./InterpretPatternProperties"));
const InterpretNot_1 = __importDefault(require("./InterpretNot"));
const InterpretDependencies_1 = __importDefault(require("./InterpretDependencies"));
const InterpretAdditionalItems_1 = __importDefault(require("./InterpretAdditionalItems"));
const interpretAnyOf_1 = __importDefault(require("./interpretAnyOf"));
class Interpreter {
    constructor() {
        this.anonymCounter = 1;
        this.seenSchemas = new Map();
    }
    /**
     * Transforms a schema into instances of CommonModel by processing all keywords from schema documents and infers the model definition.
     *
     * @param schema
     * @param interpreterOptions to control the interpret process
     */
    interpret(schema, options = Interpreter.defaultInterpreterOptions) {
        if (this.seenSchemas.has(schema)) {
            const cachedModel = this.seenSchemas.get(schema);
            if (cachedModel !== undefined) {
                return cachedModel;
            }
        }
        //If it is a false validation schema return no CommonModel
        if (schema === false) {
            return undefined;
        }
        const model = new models_1.CommonModel();
        model.originalInput = schema;
        this.seenSchemas.set(schema, model);
        this.interpretSchema(model, schema, options);
        return model;
    }
    /**
     * Function to interpret a schema into a CommonModel.
     *
     * @param model
     * @param schema
     * @param interpreterOptions to control the interpret process
     */
    interpretSchema(model, schema, interpreterOptions = Interpreter.defaultInterpreterOptions) {
        if (schema === true) {
            model.setType(['object', 'string', 'number', 'array', 'boolean', 'null', 'integer']);
        }
        else if (typeof schema === 'object') {
            this.interpretSchemaObject(model, schema, interpreterOptions);
        }
    }
    interpretSchemaObject(model, schema, interpreterOptions = Interpreter.defaultInterpreterOptions) {
        if (schema.type !== undefined) {
            model.addTypes(schema.type);
        }
        if (schema.required !== undefined) {
            model.required = schema.required;
        }
        (0, InterpretPatternProperties_1.default)(schema, model, this, interpreterOptions);
        (0, InterpretAdditionalProperties_1.default)(schema, model, this, interpreterOptions);
        (0, InterpretAdditionalItems_1.default)(schema, model, this, interpreterOptions);
        (0, InterpretItems_1.default)(schema, model, this, interpreterOptions);
        (0, InterpretProperties_1.default)(schema, model, this, interpreterOptions);
        (0, InterpretAllOf_1.default)(schema, model, this, interpreterOptions);
        (0, interpretAnyOf_1.default)(schema, model, this, interpreterOptions);
        (0, InterpretDependencies_1.default)(schema, model, this, interpreterOptions);
        (0, InterpretConst_1.default)(schema, model);
        (0, InterpretEnum_1.default)(schema, model);
        this.interpretAndCombineMultipleSchemas(schema.oneOf, model, schema, interpreterOptions);
        // this.interpretAndCombineMultipleSchemas(schema.anyOf, model, schema, interpreterOptions);
        if (!(schema instanceof models_1.Draft4Schema) && !(schema instanceof models_1.Draft6Schema)) {
            this.interpretAndCombineSchema(schema.then, model, schema, interpreterOptions);
            this.interpretAndCombineSchema(schema.else, model, schema, interpreterOptions);
        }
        (0, InterpretNot_1.default)(schema, model, this, interpreterOptions);
        //All schemas of type model object or enum MUST have ids
        if (((0, Utils_1.isModelObject)(model) === true || (0, Utils_1.isEnum)(model) === true) && (0, Utils_1.isUnionType)(model) === false) {
            model.$id = (0, Utils_1.interpretName)(schema) || `anonymSchema${this.anonymCounter++}`;
        }
        else if ((!(schema instanceof models_1.Draft4Schema) && schema.$id !== undefined) || (schema instanceof models_1.Draft4Schema && schema.id !== undefined)) {
            model.$id = (0, Utils_1.interpretName)(schema);
        }
    }
    /**
     * Go through a schema and combine the interpreted models together.
     *
     * @param schema to go through
     * @param currentModel the current output
     * @param rootSchema the root schema to use as original schema when merged
     * @param interpreterOptions to control the interpret process
     */
    interpretAndCombineSchema(schema, currentModel, rootSchema, interpreterOptions = Interpreter.defaultInterpreterOptions) {
        if (typeof schema !== 'object') {
            return;
        }
        const model = this.interpret(schema, interpreterOptions);
        if (model !== undefined) {
            models_1.CommonModel.mergeCommonModels(currentModel, model, rootSchema);
        }
    }
    /**
     * Go through multiple schemas and combine the interpreted models together.
     *
     * @param schema to go through
     * @param currentModel the current output
     * @param rootSchema the root schema to use as original schema when merged
     * @param interpreterOptions to control the interpret process
     */
    interpretAndCombineMultipleSchemas(schema, currentModel, rootSchema, interpreterOptions = Interpreter.defaultInterpreterOptions) {
        if (!Array.isArray(schema)) {
            return;
        }
        for (const forEachSchema of schema) {
            this.interpretAndCombineSchema(forEachSchema, currentModel, rootSchema, interpreterOptions);
        }
    }
}
exports.Interpreter = Interpreter;
Interpreter.defaultInterpreterOptions = {
    allowInheritance: false
};
//# sourceMappingURL=Interpreter.js.map