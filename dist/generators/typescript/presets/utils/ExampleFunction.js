"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderValueFromType = exports.renderValueFromModel = void 0;
/**
 * Inferring first acceptable value from the model.
 *
 * @param model
 * @param renderer
 */
function renderValueFromModel(model, renderer) {
    if (Array.isArray(model.enum) && model.enum.length > 0) {
        return JSON.stringify(model.enum[0]);
    }
    if (model.$ref !== undefined) {
        return `${renderer.nameType(model.$ref)}.example()`;
    }
    if (Array.isArray(model.type)) {
        if (model.type.length > 0) {
            return renderValueFromType(model.type[0], model, renderer);
        }
        return undefined;
    }
    return renderValueFromType(model.type, model, renderer);
}
exports.renderValueFromModel = renderValueFromModel;
function renderValueFromType(modelType, model, renderer) {
    if (modelType === undefined) {
        return undefined;
    }
    switch (modelType) {
        case 'string':
            return '"string"';
        case 'integer':
        case 'number':
            return '0';
        case 'boolean':
            return 'true';
        case 'array': {
            if (model.items === undefined) {
                return '[]';
            }
            //Check and see if it should be rendered as tuples 
            if (Array.isArray(model.items)) {
                const arrayValues = model.items.map((item) => {
                    return renderValueFromModel(item, renderer);
                });
                return `[${arrayValues.join(', ')}]`;
            }
            const arrayType = renderValueFromModel(model.items, renderer);
            return `[${arrayType}]`;
        }
    }
    return undefined;
}
exports.renderValueFromType = renderValueFromType;
/**
 * Render `example` function based on model properties.
 */
function renderExampleFunction({ renderer, model }) {
    const properties = model.properties || {};
    const setProperties = [];
    for (const [propertyName, property] of Object.entries(properties)) {
        const formattedPropertyName = renderer.nameProperty(propertyName, property);
        const potentialRenderedValue = renderValueFromModel(property, renderer);
        if (potentialRenderedValue === undefined) {
            //Unable to determine example value, skip property.
            continue;
        }
        setProperties.push(`  instance.${formattedPropertyName} = ${potentialRenderedValue};`);
    }
    const formattedModelName = renderer.nameType(model.$id);
    return `public static example(): ${formattedModelName} {
  const instance = new ${formattedModelName}({} as any);
${(setProperties.join('\n'))}
  return instance;
}`;
}
exports.default = renderExampleFunction;
//# sourceMappingURL=ExampleFunction.js.map