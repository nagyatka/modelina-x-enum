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
exports.TS_DEFAULT_INTERFACE_PRESET = exports.InterfaceRenderer = void 0;
const TypeScriptRenderer_1 = require("../TypeScriptRenderer");
/**
 * Renderer for TypeScript's `interface` type
 *
 * @extends TypeScriptRenderer
 */
class InterfaceRenderer extends TypeScriptRenderer_1.TypeScriptRenderer {
    defaultSelf() {
        return __awaiter(this, void 0, void 0, function* () {
            const content = [
                yield this.renderProperties(),
                yield this.runAdditionalContentPreset()
            ];
            const formattedName = this.nameType(this.model.$id);
            return `interface ${formattedName} {
${this.indent(this.renderBlock(content, 2))}
}`;
        });
    }
}
exports.InterfaceRenderer = InterfaceRenderer;
exports.TS_DEFAULT_INTERFACE_PRESET = {
    self({ renderer }) {
        return renderer.defaultSelf();
    },
    property({ renderer, propertyName, property, type }) {
        return renderer.renderProperty(propertyName, property, type);
    }
};
//# sourceMappingURL=InterfaceRenderer.js.map