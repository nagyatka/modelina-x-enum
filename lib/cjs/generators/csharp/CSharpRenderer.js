"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSharpRenderer = void 0;
const AbstractRenderer_1 = require("../AbstractRenderer");
const models_1 = require("../../models");
const FormatHelpers_1 = require("../../helpers/FormatHelpers");
const Constants_1 = require("./Constants");
/**
 * Common renderer for CSharp types
 *
 * @extends AbstractRenderer
 */
class CSharpRenderer extends AbstractRenderer_1.AbstractRenderer {
    constructor(options, generator, presets, model, inputModel) {
        super(options, generator, presets, model, inputModel);
    }
    /**
     * Renders the name of a type based on provided generator option naming convention type function.
     *
     * This is used to render names of models and then later used if that class is referenced from other models.
     *
     * @param name
     * @param model
     */
    nameType(name, model) {
        var _a, _b;
        return ((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.namingConvention) === null || _b === void 0 ? void 0 : _b.type)
            ? this.options.namingConvention.type(name, { model: model || this.model, inputModel: this.inputModel, reservedKeywordCallback: Constants_1.isReservedCSharpKeyword })
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
            ? this.options.namingConvention.property(propertyName, { model: this.model, inputModel: this.inputModel, property, reservedKeywordCallback: Constants_1.isReservedCSharpKeyword })
            : propertyName || '';
    }
    runPropertyPreset(propertyName, property, options, type = models_1.PropertyType.property) {
        return this.runPreset('property', { propertyName, property, options, type });
    }
    renderType(model, modelName) {
        var _a;
        if (model.$ref !== undefined) {
            return this.nameType(model.$ref);
        }
        const isRequired = modelName ? this.model.isRequired(modelName) || ((_a = this.model.required) === null || _a === void 0 ? void 0 : _a.map(x => this.nameProperty(x)).includes(modelName)) : false;
        if (Array.isArray(model.type)) {
            return model.type.length > 1 ? 'dynamic' : `${this.toCSharpType(model.type[0], model, modelName, isRequired)}`;
        }
        return this.toCSharpType(model.type, model, modelName, isRequired);
    }
    renderComments(lines) {
        lines = FormatHelpers_1.FormatHelpers.breakLines(lines);
        return lines.map(line => `// ${line}`).join('\n');
    }
    toCSharpType(type, model, modelName, isRequired) {
        switch (type) {
            case 'integer':
            case 'int32':
                return `int${this.questionMark(isRequired)}`;
            case 'long':
            case 'int64':
                return `long${this.questionMark(isRequired)}`;
            case 'boolean':
                return `bool${this.questionMark(isRequired)}`;
            case 'date':
            case 'time':
            case 'dateTime':
            case 'date-time':
                return `System.DateTime${this.questionMark(isRequired)}`;
            case 'string':
            case 'password':
            case 'byte':
                return 'string';
            case 'float':
                return `float${this.questionMark(isRequired)}`;
            case 'double':
            case 'number':
                return `double${this.questionMark(isRequired)}`;
            case 'binary':
                return 'byte[]';
            case 'object':
                return 'object';
            case 'array': {
                let arrayItemModel = model.items;
                if (Array.isArray(model.items)) {
                    arrayItemModel = model.items.reduce((prevModel, currentModel) => {
                        return models_1.CommonModel.mergeCommonModels(models_1.CommonModel.toCommonModel(prevModel), models_1.CommonModel.toCommonModel(currentModel), {});
                    });
                    if (model.additionalItems !== undefined) {
                        arrayItemModel = models_1.CommonModel.mergeCommonModels(arrayItemModel, model.additionalItems, {});
                    }
                }
                const newType = arrayItemModel ? this.renderType(arrayItemModel, modelName) : 'dynamic';
                if (this.options.collectionType && this.options.collectionType === 'List') {
                    return `IEnumerable<${newType}>`;
                }
                return `${newType}[]`;
            }
            default: return 'dynamic';
        }
    }
    questionMark(isRequired) {
        return isRequired ? '' : '?';
    }
}
exports.CSharpRenderer = CSharpRenderer;
//# sourceMappingURL=CSharpRenderer.js.map