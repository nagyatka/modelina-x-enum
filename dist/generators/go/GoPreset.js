"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GO_DEFAULT_PRESET = exports.FieldType = void 0;
const StructRenderer_1 = require("./renderers/StructRenderer");
const EnumRenderer_1 = require("./renderers/EnumRenderer");
var FieldType;
(function (FieldType) {
    FieldType[FieldType["field"] = 0] = "field";
    FieldType[FieldType["additionalProperty"] = 1] = "additionalProperty";
    FieldType[FieldType["patternProperties"] = 2] = "patternProperties";
})(FieldType = exports.FieldType || (exports.FieldType = {}));
exports.GO_DEFAULT_PRESET = {
    struct: StructRenderer_1.GO_DEFAULT_STRUCT_PRESET,
    enum: EnumRenderer_1.GO_DEFAULT_ENUM_PRESET,
};
//# sourceMappingURL=GoPreset.js.map