"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Interpreter_1 = require("./Interpreter");
/**
 * Interpreter function for additionalItems keyword.
 *
 * @param schema
 * @param model
 * @param interpreter
 * @param interpreterOptions to control the interpret process
 */
function interpretAdditionalItems(schema, model, interpreter, interpreterOptions = Interpreter_1.Interpreter.defaultInterpreterOptions) {
    var _a;
    if (typeof schema === 'boolean' || ((_a = model.type) === null || _a === void 0 ? void 0 : _a.includes('array')) === false) {
        return;
    }
    const additionalItemsModel = interpreter.interpret(schema.additionalItems === undefined ? true : schema.additionalItems, interpreterOptions);
    if (additionalItemsModel !== undefined) {
        model.addAdditionalItems(additionalItemsModel, schema);
    }
}
exports.default = interpretAdditionalItems;
//# sourceMappingURL=InterpretAdditionalItems.js.map