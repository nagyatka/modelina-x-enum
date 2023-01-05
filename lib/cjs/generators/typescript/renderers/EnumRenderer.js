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
exports.TS_DEFAULT_ENUM_PRESET = exports.EnumRenderer = void 0;
const TypeScriptRenderer_1 = require("../TypeScriptRenderer");
const helpers_1 = require("../../../helpers");
/**
 * Renderer for TypeScript's `enum` type
 *
 * @extends TypeScriptRenderer
 */
class EnumRenderer extends TypeScriptRenderer_1.TypeScriptRenderer {
    defaultSelf() {
        return __awaiter(this, void 0, void 0, function* () {
            const content = [
                yield this.renderItems(),
                yield this.runAdditionalContentPreset()
            ];
            const formattedName = this.nameType(this.model.$id);
            return `enum ${formattedName} {
${this.indent(this.renderBlock(content, 2))}
}`;
        });
    }
    renderItems() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const enums = this.model.enum || [];
            const xEnumNames = (_a = this.model.originalInput['x-enumNames']) !== null && _a !== void 0 ? _a : [];
            const hasEnumNames = xEnumNames.length === enums.length;
            const items = [];
            for (const [index, item] of enums.entries()) {
                const renderedItem = yield this.runItemPreset(hasEnumNames ? { name: xEnumNames[index], value: item } : item);
                items.push(renderedItem);
            }
            return this.renderBlock(items);
        });
    }
    runItemPreset(item) {
        return this.runPreset('item', { item });
    }
    normalizeKey(value) {
        let key;
        switch (typeof value) {
            case 'bigint':
            case 'number': {
                key = `number_${value}`;
                break;
            }
            case 'object': {
                key = JSON.stringify(value);
                break;
            }
            default: {
                key = helpers_1.FormatHelpers.replaceSpecialCharacters(String(value), { exclude: [' ', '_'], separator: '_' });
                //Ensure no special char can be the beginning letter 
                if (!(/^[a-zA-Z]+$/).test(key.charAt(0))) {
                    key = `String_${key}`;
                }
            }
        }
        return helpers_1.FormatHelpers.toConstantCase(key);
    }
    normalizeValue(value) {
        let normalizedValue;
        switch (typeof value) {
            case 'string':
            case 'boolean':
                normalizedValue = `"${value}"`;
                break;
            case 'bigint':
            case 'number': {
                normalizedValue = value;
                break;
            }
            case 'object': {
                normalizedValue = `'${JSON.stringify(value)}'`;
                break;
            }
            default: {
                normalizedValue = String(value);
            }
        }
        return normalizedValue;
    }
}
exports.EnumRenderer = EnumRenderer;
exports.TS_DEFAULT_ENUM_PRESET = {
    self({ renderer }) {
        return renderer.defaultSelf();
    },
    item({ item, renderer }) {
        const useEnumNames = item.name !== undefined;
        const key = renderer.normalizeKey(useEnumNames ? item.name : item);
        const value = renderer.normalizeValue(useEnumNames ? item.value : item);
        return `${key} = ${value},`;
    }
};
//# sourceMappingURL=EnumRenderer.js.map