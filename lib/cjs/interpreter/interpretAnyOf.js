"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Interpreter_1 = require("./Interpreter");
/**
 * Interpreter function for allOf keyword.
 *
 * It either merges allOf schemas into existing model or if allowed, create inheritance.
 *
 * @param schema
 * @param model
 * @param interpreter
 * @param interpreterOptions to control the interpret process
 */
function interpretAnyOf(schema, model, interpreter, interpreterOptions = Interpreter_1.Interpreter.defaultInterpreterOptions) {
    if (typeof schema === 'boolean' || schema.anyOf === undefined) {
        return;
    }
    for (const anyOfSchema of schema.anyOf) {
        const anyOfModel = interpreter.interpret(anyOfSchema, interpreterOptions);
        if (anyOfModel === undefined) {
            continue;
        }
        model.addUnionType(anyOfModel.$id, anyOfModel);
    }
}
exports.default = interpretAnyOf;
//# sourceMappingURL=interpretAnyOf.js.map