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
exports.JAVA_DEFAULT_ENUM_PRESET = exports.EnumRenderer = void 0;
const JavaRenderer_1 = require("../JavaRenderer");
const helpers_1 = require("../../../helpers");
/**
 * Renderer for Java's `enum` type
 *
 * @extends JavaRenderer
 */
class EnumRenderer extends JavaRenderer_1.JavaRenderer {
    defaultSelf() {
        return __awaiter(this, void 0, void 0, function* () {
            const content = [
                yield this.renderItems(),
                yield this.runCtorPreset(),
                yield this.runGetValuePreset(),
                yield this.runFromValuePreset(),
                yield this.runAdditionalContentPreset()
            ];
            const formattedName = this.nameType(this.model.$id);
            return `public enum ${formattedName} {
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
            return `${content};`;
        });
    }
    normalizeKey(value) {
        let key;
        switch (typeof value) {
            case 'bigint':
            case 'number': {
                key = `number_${value}`;
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
                key = helpers_1.FormatHelpers.replaceSpecialCharacters(String(value), { exclude: [' ', '_'], separator: '_' });
                //Ensure no special char can be the beginning letter 
                if (!(/^[a-zA-Z]+$/).test(key.charAt(0))) {
                    key = `string_${key}`;
                }
            }
        }
        return helpers_1.FormatHelpers.toConstantCase(key);
    }
    normalizeValue(value) {
        if (typeof value === 'string') {
            return `"${value}"`;
        }
        if (typeof value === 'object') {
            return `"${JSON.stringify(value).replace(/"/g, '\\"')}"`;
        }
        return String(value);
    }
    runItemPreset(item) {
        return this.runPreset('item', { item });
    }
    runCtorPreset() {
        return this.runPreset('ctor');
    }
    runGetValuePreset() {
        return this.runPreset('getValue');
    }
    runFromValuePreset() {
        return this.runPreset('fromValue');
    }
}
exports.EnumRenderer = EnumRenderer;
exports.JAVA_DEFAULT_ENUM_PRESET = {
    self({ renderer }) {
        return renderer.defaultSelf();
    },
    item({ renderer, item }) {
        const key = renderer.normalizeKey(item);
        const value = renderer.normalizeValue(item);
        return `${key}(${value})`;
    },
    ctor({ renderer, model }) {
        const enumName = renderer.nameType(model.$id);
        const type = Array.isArray(model.type) ? 'Object' : model.type;
        const classType = renderer.toClassType(renderer.toJavaType(type, model));
        return `private ${classType} value;

${enumName}(${classType} value) {
  this.value = value;
}`;
    },
    getValue({ renderer, model }) {
        const type = Array.isArray(model.type) ? 'Object' : model.type;
        const classType = renderer.toClassType(renderer.toJavaType(type, model));
        return `public ${classType} getValue() {
  return value;
}`;
    },
    fromValue({ renderer, model }) {
        const enumName = renderer.nameType(model.$id);
        const type = Array.isArray(model.type) ? 'Object' : model.type;
        const classType = renderer.toClassType(renderer.toJavaType(type, model));
        return `public static ${enumName} fromValue(${classType} value) {
  for (${enumName} e : ${enumName}.values()) {
    if (e.value.equals(value)) {
      return e;
    }
  }
  throw new IllegalArgumentException("Unexpected value '" + value + "'");
}`;
    },
    additionalContent() {
        return `@Override
public String toString() {
  return String.valueOf(value);
}`;
    }
};
//# sourceMappingURL=EnumRenderer.js.map