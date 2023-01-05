"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Interpreter_1 = require("./Interpreter");
/**
 * Interpreter function for interpreting properties keyword.
 *
 * @param schema
 * @param model
 * @param interpreter
 * @param interpreterOptions to control the interpret process
 */
function interpretProperties(schema, model, interpreter, interpreterOptions = Interpreter_1.Interpreter.defaultInterpreterOptions) {
    if (typeof schema === 'boolean' || schema.properties === undefined) {
        return;
    }
    model.addTypes('object');
    for (const [propertyName, propertySchema] of Object.entries(schema.properties)) {
        const propertyModel = interpreter.interpret(propertySchema, interpreterOptions);
        if (propertyModel !== undefined) {
            model.addProperty(propertyName, propertyModel, schema);
        }
    }
}
exports.default = interpretProperties;
//# sourceMappingURL=InterpretProperties.js.map