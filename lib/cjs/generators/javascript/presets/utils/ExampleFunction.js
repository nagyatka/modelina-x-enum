"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderValueFromType = exports.renderValueFromModel = void 0;
function renderValueFromModel(model, renderer) {
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
function renderExampleFunction({ renderer, model }) {
    const properties = model.properties || {};
    const setProperties = [];
    for (const [propertyName, property] of Object.entries(properties)) {
        const formattedPropertyName = renderer.nameProperty(propertyName, property);
        const potentialRenderedValue = renderValueFromModel(property, renderer);
        if (potentialRenderedValue === undefined) {
            continue;
        }
        setProperties.push(`  instance.${formattedPropertyName} = ${potentialRenderedValue};`);
    }
    const formattedModelName = renderer.nameType(model.$id);
    return `example(){
  const instance = new ${formattedModelName}({});
${(setProperties.join('\n'))}
  return instance;
}`;
}
exports.default = renderExampleFunction;
//# sourceMappingURL=ExampleFunction.js.map