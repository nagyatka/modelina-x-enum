"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSHARP_COMMON_PRESET = void 0;
const helpers_1 = require("../../../helpers");
/**
 * Render `equal` function based on model's properties
 */
function renderEqual({ renderer, model }) {
    const formattedModelName = renderer.nameType(model.$id);
    const properties = model.properties || {};
    const propertyKeys = Object.keys(properties);
    if (model.additionalProperties) {
        propertyKeys.push((0, helpers_1.getUniquePropertyName)(model, helpers_1.DefaultPropertyNames.additionalProperties));
    }
    for (const [pattern, patternModel] of Object.entries(model.patternProperties || {})) {
        propertyKeys.push((0, helpers_1.getUniquePropertyName)(patternModel, `${pattern}${helpers_1.DefaultPropertyNames.patternProperties}`));
    }
    let equalProperties = propertyKeys.map(prop => {
        const accessorMethodProp = helpers_1.FormatHelpers.upperFirst(renderer.nameProperty(prop));
        return `${accessorMethodProp} == model.${accessorMethodProp}`;
    }).join(' && \n');
    equalProperties = `return ${equalProperties !== '' ? equalProperties : 'true'}`;
    const methodContent = `if(obj is ${formattedModelName} model)
{
${renderer.indent('if(ReferenceEquals(this, model)) { return true; }')}
${renderer.indent(equalProperties)};
}

return false;`;
    return `public override bool Equals(object obj)
{
${renderer.indent(methodContent)}
}`;
}
/**
 * Render `hashCode` function based on model's properties
 */
function renderHashCode({ renderer, model }) {
    const properties = model.properties || {};
    const propertyKeys = Object.keys(properties);
    if (model.additionalProperties) {
        propertyKeys.push((0, helpers_1.getUniquePropertyName)(model, helpers_1.DefaultPropertyNames.additionalProperties));
    }
    for (const [pattern, patternModel] of Object.entries(model.patternProperties || {})) {
        propertyKeys.push((0, helpers_1.getUniquePropertyName)(patternModel, `${pattern}${helpers_1.DefaultPropertyNames.patternProperties}`));
    }
    const hashProperties = propertyKeys.map(prop => `hash.Add(${helpers_1.FormatHelpers.upperFirst(renderer.nameProperty(prop))});`).join('\n');
    return `public override int GetHashCode()
{
  HashCode hash = new HashCode();
${renderer.indent(hashProperties, 2)}
  return hash.ToHashCode();
}`;
}
/**
 * Preset which adds `Equals`, `GetHashCode` functions to class.
 *
 * @implements {CSharpPreset}
 */
exports.CSHARP_COMMON_PRESET = {
    class: {
        additionalContent({ renderer, model, content, options }) {
            options = options || {};
            const blocks = [];
            if (options.equal === undefined || options.equal === true) {
                blocks.push(renderEqual({ renderer, model }));
            }
            if (options.hashCode === undefined || options.hashCode === true) {
                renderer.addDependency('using System;');
                blocks.push(renderHashCode({ renderer, model }));
            }
            return renderer.renderBlock([content, ...blocks], 2);
        },
    }
};
//# sourceMappingURL=CommonPreset.js.map