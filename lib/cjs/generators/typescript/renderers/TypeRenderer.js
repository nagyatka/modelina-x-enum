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
exports.TS_DEFAULT_TYPE_PRESET = exports.TypeRenderer = void 0;
const TypeScriptRenderer_1 = require("../TypeScriptRenderer");
const helpers_1 = require("../../../helpers");
/**
 * Renderer for TypeScript's `type` type
 *
 * @extends TypeScriptRenderer
 */
class TypeRenderer extends TypeScriptRenderer_1.TypeScriptRenderer {
    defaultSelf() {
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield this.renderTypeBody();
            const formattedName = this.nameType(this.model.$id);
            return `type ${formattedName} = ${body};`;
        });
    }
    renderTypeBody() {
        const kind = helpers_1.TypeHelpers.extractKind(this.model);
        if (kind === helpers_1.ModelKind.ENUM) {
            return Promise.resolve(this.renderEnum());
        }
        return Promise.resolve(this.renderType(this.model));
    }
    renderEnum() {
        const enums = this.model.enum || [];
        return enums.map(t => typeof t === 'string' ? `"${t}"` : t).join(' | ');
    }
}
exports.TypeRenderer = TypeRenderer;
exports.TS_DEFAULT_TYPE_PRESET = {
    self({ renderer }) {
        return renderer.defaultSelf();
    },
};
//# sourceMappingURL=TypeRenderer.js.map