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
exports.GO_DEFAULT_STRUCT_PRESET = exports.StructRenderer = void 0;
const GoRenderer_1 = require("../GoRenderer");
const GoPreset_1 = require("../GoPreset");
/**
 * Renderer for Go's `struct` type
 *
 * @extends GoRenderer
 */
class StructRenderer extends GoRenderer_1.GoRenderer {
    defaultSelf() {
        return __awaiter(this, void 0, void 0, function* () {
            const content = [
                yield this.renderFields(),
                yield this.runAdditionalContentPreset()
            ];
            const formattedName = this.nameType(this.model.$id);
            const doc = this.renderComments(`${formattedName} represents a ${formattedName} model.`);
            return `${doc}
type ${formattedName} struct {
${this.indent(this.renderBlock(content, 2))}
}`;
        });
    }
}
exports.StructRenderer = StructRenderer;
exports.GO_DEFAULT_STRUCT_PRESET = {
    self({ renderer }) {
        return renderer.defaultSelf();
    },
    field({ fieldName, field, renderer, type }) {
        fieldName = renderer.nameField(fieldName, field);
        let fieldType = renderer.renderType(field);
        if (type === GoPreset_1.FieldType.additionalProperty || type === GoPreset_1.FieldType.patternProperties) {
            fieldType = `map[string]${fieldType}`;
        }
        return `${fieldName} ${fieldType}`;
    },
};
//# sourceMappingURL=StructRenderer.js.map