"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Interpreter_1 = require("./Interpreter");
const Utils_1 = require("./Utils");
/**
 * Interpreter function for additionalProperties keyword.
 *
 * @param schema
 * @param model
 * @param interpreter
 * @param interpreterOptions to control the interpret process
 */
function interpretAdditionalProperties(schema, model, interpreter, interpreterOptions = Interpreter_1.Interpreter.defaultInterpreterOptions) {
    if (typeof schema === 'boolean' || (0, Utils_1.isModelObject)(model) === false) {
        return;
    }
    const additionalPropertiesModel = interpreter.interpret(schema.additionalProperties === undefined ? true : schema.additionalProperties, interpreterOptions);
    if (additionalPropertiesModel !== undefined) {
        model.addAdditionalProperty(additionalPropertiesModel, schema);
    }
}
exports.default = interpretAdditionalProperties;
//# sourceMappingURL=InterpretAdditionalProperties.js.map