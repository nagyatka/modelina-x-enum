"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeHelpers = exports.ModelKind = void 0;
var ModelKind;
(function (ModelKind) {
    ModelKind["OBJECT"] = "object";
    ModelKind["ARRAY"] = "array";
    ModelKind["ENUM"] = "enum";
    ModelKind["CONST"] = "const";
    ModelKind["UNION"] = "union";
    ModelKind["PRIMITIVE"] = "primitive";
})(ModelKind = exports.ModelKind || (exports.ModelKind = {}));
class TypeHelpers {
    /**
     * Returns the type (object | array | union | enum | primitive) of the model
     * @param model to check
     * @returns {ModelKind}
     */
    static extractKind(model) {
        if (model.type === 'object') {
            return ModelKind.OBJECT;
        }
        if (model.type === 'array') {
            return ModelKind.ARRAY;
        }
        if (Array.isArray(model.enum) && model.enum.length === 1 && model.originalInput.const) {
            return ModelKind.CONST;
        }
        if (Array.isArray(model.enum)) {
            return ModelKind.ENUM;
        }
        if (Array.isArray(model.type)) {
            return ModelKind.UNION;
        }
        return ModelKind.PRIMITIVE;
    }
}
exports.TypeHelpers = TypeHelpers;
//# sourceMappingURL=TypeHelpers.js.map