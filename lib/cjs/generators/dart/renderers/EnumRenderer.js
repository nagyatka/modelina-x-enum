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
exports.DART_DEFAULT_ENUM_PRESET = exports.EnumRenderer = void 0;
const DartRenderer_1 = require("../DartRenderer");
const helpers_1 = require("../../../helpers");
/**
 * Renderer for Dart's `enum` type
 *
 * @extends DartRenderer
 */
class EnumRenderer extends DartRenderer_1.DartRenderer {
    defaultSelf() {
        return __awaiter(this, void 0, void 0, function* () {
            const content = [
                yield this.renderItems(),
            ];
            const formattedName = this.nameType(this.model.$id);
            return `enum ${formattedName} {
${this.indent(this.renderBlock(content, 2))}
}`;
        });
    }
    renderItems() {
        return __awaiter(this, void 0, void 0, function* () {
            const enums = this.model.enum || [];
            const items = [];
            for (const value of enums) {
                const renderedItem = yield this.runItemPreset(value);
                items.push(renderedItem);
            }
            const content = items.join(', ');
            return `${content}`;
        });
    }
    normalizeKey(value) {
        let key;
        switch (typeof value) {
            case 'bigint':
            case 'number': {
                key = 'number_${value}';
                break;
            }
            case 'boolean': {
                key = `boolean_${value}`;
                break;
            }
            case 'object': {
                key = JSON.stringify(value);
                break;
            }
            default: {
                key = helpers_1.FormatHelpers.replaceSpecialCharacters(String(value), { exclude: [' '], separator: '_' });
                //Ensure no special char can be the beginning letter 
                if (!(/^[a-zA-Z]+$/).test(key.charAt(0))) {
                    key = `string_${key}`;
                }
            }
        }
        return helpers_1.FormatHelpers.toConstantCase(key);
    }
    normalizeValue(value) {
        if (typeof value === 'number') {
            return `NUMBER_${value}`;
        }
        if (typeof value === 'string') {
            return `${value}`;
        }
        if (typeof value === 'object') {
            return `${JSON.stringify(value).replace(/"/g, '\\"')}`;
        }
        return String(value);
    }
    runItemPreset(item) {
        return this.runPreset('item', { item });
    }
}
exports.EnumRenderer = EnumRenderer;
exports.DART_DEFAULT_ENUM_PRESET = {
    self({ renderer }) {
        return renderer.defaultSelf();
    },
    item({ renderer, item }) {
        const value = renderer.normalizeValue(item);
        return `${value}`;
    },
};
//# sourceMappingURL=EnumRenderer.js.map