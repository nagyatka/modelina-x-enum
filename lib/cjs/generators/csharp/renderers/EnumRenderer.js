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
exports.CSHARP_DEFAULT_ENUM_PRESET = exports.EnumRenderer = void 0;
const CSharpRenderer_1 = require("../CSharpRenderer");
const change_case_1 = require("change-case");
const helpers_1 = require("../../../helpers");
/**
 * Renderer for C#'s `enum` type
 *
 * @extends CSharpRenderer
 */
class EnumRenderer extends CSharpRenderer_1.CSharpRenderer {
    defaultSelf() {
        return __awaiter(this, void 0, void 0, function* () {
            const enumItems = yield this.renderItems();
            const formattedName = this.nameType(this.model.$id);
            const getValueCaseItemValues = yield this.getValueCaseItemValues();
            const toEnumCaseItemValues = yield this.toEnumCaseItemValues();
            const enumValueSwitch = `switch (enumValue)
{
${this.indent(getValueCaseItemValues)}
}
return null;`;
            const valueSwitch = `switch (value)
{
${this.indent(toEnumCaseItemValues)}
}
return null;`;
            const classContent = `public static dynamic GetValue(this ${formattedName} enumValue)
{
${this.indent(enumValueSwitch)}
}

public static ${formattedName}? To${formattedName}(dynamic value)
{
${this.indent(valueSwitch)}
}`;
            return `public enum ${formattedName}
{
${this.indent(enumItems)}
}

public static class ${formattedName}Extensions
{
${this.indent(classContent)}
}
`;
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
            const content = items.join(',\n');
            return `${content}`;
        });
    }
    /**
     * Some enum values require custom value conversion
     */
    getEnumValue(enumValue) {
        switch (typeof enumValue) {
            case 'number':
            case 'bigint':
            case 'boolean':
                return enumValue;
            case 'object':
                return `"${JSON.stringify(enumValue).replace(/"/g, '\\"')}"`;
            default:
                return `"${enumValue}"`;
        }
    }
    toEnumCaseItemValues() {
        return __awaiter(this, void 0, void 0, function* () {
            const enums = this.model.enum || [];
            const items = [];
            const formattedName = this.nameType(this.model.$id);
            for (const enumValue of enums) {
                const renderedItem = yield this.runItemPreset(enumValue);
                const value = this.getEnumValue(enumValue);
                items.push(`case ${value}: return ${formattedName}.${renderedItem};`);
            }
            const content = items.join('\n');
            return `${content}`;
        });
    }
    getValueCaseItemValues() {
        return __awaiter(this, void 0, void 0, function* () {
            const enums = this.model.enum || [];
            const items = [];
            const formattedName = this.nameType(this.model.$id);
            for (const enumValue of enums) {
                const renderedItem = yield this.runItemPreset(enumValue);
                const value = this.getEnumValue(enumValue);
                items.push(`case ${formattedName}.${renderedItem}: return ${value};`);
            }
            const content = items.join('\n');
            return `${content}`;
        });
    }
    runItemPreset(item) {
        return this.runPreset('item', { item });
    }
}
exports.EnumRenderer = EnumRenderer;
exports.CSHARP_DEFAULT_ENUM_PRESET = {
    self({ renderer }) {
        return renderer.defaultSelf();
    },
    item({ item }) {
        let itemName = helpers_1.FormatHelpers.replaceSpecialCharacters(String(item), { exclude: [' '], separator: '_' });
        if (typeof item === 'number' || typeof item === 'bigint') {
            itemName = `Number_${itemName}`;
        }
        else if (typeof item === 'object') {
            itemName = `${JSON.stringify(item)}`;
        }
        else if (!(/^[a-zA-Z]+$/).test(itemName.charAt(0))) {
            itemName = `String_${itemName}`;
        }
        return (0, change_case_1.pascalCase)(itemName);
    },
};
//# sourceMappingURL=EnumRenderer.js.map