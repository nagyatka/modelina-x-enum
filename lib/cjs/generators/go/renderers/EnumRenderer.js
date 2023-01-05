"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GO_DEFAULT_ENUM_PRESET = exports.EnumRenderer = void 0;
const GoRenderer_1 = require("../GoRenderer");
const helpers_1 = require("../../../helpers");
/**
 * Renderer for Go's `enum` type
 *
 * @extends GoRenderer
 */
class EnumRenderer extends GoRenderer_1.GoRenderer {
    defaultSelf() {
        const formattedName = this.nameType(this.model.$id);
        const type = this.enumType(this.model);
        const doc = formattedName && this.renderCommentForEnumType(formattedName, type);
        // eslint-disable-next-line sonarjs/no-duplicate-string
        if (type === 'interface{}') {
            return `${doc}
type ${formattedName} ${type}`;
        }
        const enumValues = this.renderConstValuesForEnumType(formattedName, type, this.model.enum);
        return `${doc}
type ${formattedName} ${type}

const (
${this.indent(this.renderBlock(enumValues))}
)`;
    }
    enumType(model) {
        if (this.model.type === undefined || Array.isArray(this.model.type)) {
            return 'interface{}';
        }
        return this.toGoType(this.model.type, model);
    }
    renderCommentForEnumType(name, type) {
        const globalType = type === 'interface{}' ? 'mixed types' : type;
        return this.renderComments(`${name} represents an enum of ${globalType}.`);
    }
    renderConstValuesForEnumType(typeName, innerType, values) {
        const firstName = typeName.concat(helpers_1.FormatHelpers.upperFirst(helpers_1.FormatHelpers.toCamelCase(values[0].toString())));
        let enumValues = [innerType === 'string' ? `${firstName} ${typeName} = "${values[0]}"` : `${firstName} ${typeName} = iota`];
        for (const value of values.slice(1)) {
            const name = typeName.concat(helpers_1.FormatHelpers.upperFirst(helpers_1.FormatHelpers.toCamelCase(value)));
            if (innerType === 'string') {
                enumValues = enumValues.concat(`${name} = "${value}"`);
            }
            if (innerType === 'int') {
                enumValues = enumValues.concat(`${name}`);
            }
        }
        return enumValues;
    }
}
exports.EnumRenderer = EnumRenderer;
exports.GO_DEFAULT_ENUM_PRESET = {
    self({ renderer }) {
        return renderer.defaultSelf();
    },
};
//# sourceMappingURL=EnumRenderer.js.map