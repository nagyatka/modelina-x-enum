"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
/**
 * Interpreter function for const keyword for draft version > 4
 *
 * @param schema
 * @param model
 */
function interpretConst(schema, model) {
    if (schema instanceof models_1.Draft4Schema || typeof schema === 'boolean' || schema.const === undefined) {
        return;
    }
    const schemaConst = schema.const;
    model.enum = [schemaConst];
    model.setType(`'${schemaConst}'`);
    //If schema does not contain type interpret the schema
    /*if (schema.type === undefined) {
      const inferredType = inferTypeFromValue(schemaConst);
      if (inferredType !== undefined) {
        model.setType(inferredType);
      }
    }*/
}
exports.default = interpretConst;
//# sourceMappingURL=InterpretConst.js.map