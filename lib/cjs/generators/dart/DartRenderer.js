"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DartRenderer = void 0;
const AbstractRenderer_1 = require("../AbstractRenderer");
const models_1 = require("../../models");
const helpers_1 = require("../../helpers");
const Constants_1 = require("./Constants");
/**
 * Common renderer for Dart types
 *
 * @extends AbstractRenderer
 */
class DartRenderer extends AbstractRenderer_1.AbstractRenderer {
    constructor(options, generator, presets, model, inputModel) {
        super(options, generator, presets, model, inputModel);
    }
    /**
     * Renders the name of a type based on provided generator option naming convention type function.
     *
     * This is used to render names of models and then later used if it is referenced from other models.
     *
     * @param name
     * @param model
     */
    nameType(name, model) {
        var _a, _b;
        return ((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.namingConvention) === null || _b === void 0 ? void 0 : _b.type)
            ? this.options.namingConvention.type(name, { model: model || this.model, inputModel: this.inputModel, reservedKeywordCallback: Constants_1.isReservedDartKeyword })
            : name || '';
    }
    /**
     * Renders the name of a property based on provided generator option naming convention property function.
     *
     * @param propertyName
     * @param property
     */
    nameProperty(propertyName, property) {
        var _a, _b;
        return ((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.namingConvention) === null || _b === void 0 ? void 0 : _b.property)
            ? this.options.namingConvention.property(propertyName, { model: this.model, inputModel: this.inputModel, property, reservedKeywordCallback: Constants_1.isReservedDartKeyword })
            : propertyName || '';
    }
    /**
     * Renders model(s) to Dart type(s).
     *
     * @param model
     */
    renderType(model) {
        if (Array.isArray(model) || Array.isArray(model.type)) {
            return 'Object'; // fallback
        }
        if (model.$ref !== undefined) {
            return this.nameType(model.$ref, model);
        }
        const kind = helpers_1.TypeHelpers.extractKind(model);
        if (kind === helpers_1.ModelKind.PRIMITIVE ||
            kind === helpers_1.ModelKind.ARRAY) {
            const format = model.getFromOriginalInput('format');
            return this.toClassType(this.toDartType(format || model.type, model));
        }
        return this.nameType(model.$id, model);
    }
    /**
     * Returns the Dart corresponding type from CommonModel type or JSON schema format
     * @param type
     * @param model
     */
    toDartType(type, model) {
        switch (type) {
            case 'integer':
            case 'int32':
            case 'long':
            case 'int64':
                return 'int';
            case 'boolean':
                return 'bool';
            case 'date':
                return 'DateTime';
            case 'time':
                return 'DateTime';
            case 'dateTime':
            case 'date-time':
                return 'DateTime';
            case 'string':
            case 'password':
            case 'byte':
                return 'String';
            case 'float':
            case 'double':
            case 'number':
                return 'double';
            case 'binary':
                return 'byte[]';
            case 'array': {
                let arrayItemModel = model.items;
                //Since Dart dont support tuples, lets make sure that we combine the tuple types to find the appropriate array type 
                if (Array.isArray(model.items)) {
                    arrayItemModel = model.items.reduce((prevModel, currentModel) => {
                        return models_1.CommonModel.mergeCommonModels(models_1.CommonModel.toCommonModel(prevModel), models_1.CommonModel.toCommonModel(currentModel), {});
                    });
                    //If tuples and additionalItems make sure to find the appropriate type by merging all the tuples and additionalItems model together to find the combined type.
                    if (model.additionalItems !== undefined) {
                        arrayItemModel = models_1.CommonModel.mergeCommonModels(arrayItemModel, model.additionalItems, {});
                    }
                }
                const newType = arrayItemModel ? this.renderType(arrayItemModel) : 'Object';
                if (this.options.collectionType && this.options.collectionType === 'List') {
                    return `List<${newType}>`;
                }
                return `${newType}[]`;
            }
            default:
                return 'Object';
        }
    }
    toClassType(type) {
        switch (type) {
            case 'int':
            case 'long':
                return 'int';
            case 'boolean':
                return 'bool';
            case 'float':
            case 'double':
                return 'double';
            default:
                return `${type}`;
        }
    }
    renderComments(lines) {
        lines = helpers_1.FormatHelpers.breakLines(lines);
        const newLiteral = lines.map(line => ` * ${line}`).join('\n');
        return `/**
${newLiteral}
 */`;
    }
    renderAnnotation(annotationName, value) {
        const name = `@${helpers_1.FormatHelpers.upperFirst(annotationName)}`;
        let values = undefined;
        if (value !== undefined) {
            if (typeof value === 'object') {
                values = Object.entries(value || {}).map(([paramName, newValue]) => {
                    if (paramName && newValue !== undefined) {
                        return `${paramName}=${newValue}`;
                    }
                    return newValue;
                }).filter(v => v !== undefined).join(', ');
            }
            else {
                values = value;
            }
        }
        return values !== undefined ? `${name}(${values})` : name;
    }
}
exports.DartRenderer = DartRenderer;
//# sourceMappingURL=DartRenderer.js.map