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
exports.TypeScriptRenderer = void 0;
const AbstractRenderer_1 = require("../AbstractRenderer");
const helpers_1 = require("../../helpers");
const models_1 = require("../../models");
const NameHelpers_1 = require("../../helpers/NameHelpers");
const Constants_1 = require("./Constants");
/**
 * Common renderer for TypeScript types
 *
 * @extends AbstractRenderer
 */
class TypeScriptRenderer extends AbstractRenderer_1.AbstractRenderer {
    constructor(options, generator, presets, model, inputModel) {
        super(options, generator, presets, model, inputModel);
    }
    /**
     * Renders the name of a type based on provided generator option naming convention type function.
     *
     * This is used to render names of models (example TS class) and then later used if that class is referenced from other models.
     *
     * @param name
     * @param model
     */
    nameType(name, model) {
        var _a, _b;
        return ((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.namingConvention) === null || _b === void 0 ? void 0 : _b.type)
            ? this.options.namingConvention.type(name, { model: model || this.model, inputModel: this.inputModel, reservedKeywordCallback: Constants_1.isReservedTypeScriptKeyword })
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
            ? this.options.namingConvention.property(propertyName, { model: this.model, inputModel: this.inputModel, property, reservedKeywordCallback: Constants_1.isReservedTypeScriptKeyword })
            : propertyName || '';
    }
    renderType(model) {
        if (Array.isArray(model)) {
            return model.map(t => this.renderType(t)).join(' | ');
        }
        if (model.unionType !== undefined) {
            return Object.keys(model.unionType).join(' | ');
        }
        if (model.enum !== undefined) {
            return model.enum.map(value => typeof value === 'string' ? `"${value}"` : value).join(' | ');
        }
        if (model.$ref !== undefined) {
            return this.nameType(model.$ref);
        }
        if (Array.isArray(model.type)) {
            return [...new Set(model.type.map(t => this.toTsType(t, model)))].join(' | ');
        }
        return this.toTsType(model.type, model);
    }
    /**
     * JSON Schema types to TS
     *
     * @param type
     * @param model
     */
    toTsType(type, model) {
        switch (type) {
            case 'null':
                return 'null';
            case 'object':
                return 'object';
            case 'string':
                return 'string';
            case 'integer':
            case 'number':
                return 'number';
            case 'boolean':
                return 'boolean';
            case 'array': {
                //Check and see if it should be rendered as tuples or array 
                if (Array.isArray(model.items)) {
                    const types = model.items.map((item) => {
                        return this.renderType(item);
                    });
                    const additionalTypes = model.additionalItems ? `, ...(${this.renderType(model.additionalItems)})[]` : '';
                    return `[${types.join(', ')}${additionalTypes}]`;
                }
                const arrayType = model.items ? this.renderType(model.items) : 'unknown';
                return `Array<${arrayType}>`;
            }
            default: return 'any';
        }
    }
    renderTypeSignature(type, { isRequired = true, orUndefined = false, } = {}) {
        if (this.options.renderTypes === false) {
            return '';
        }
        const annotation = isRequired ? ':' : '?:';
        let t = this.renderType(type);
        t = orUndefined ? `${t} | undefined` : t;
        return `${annotation} ${t}`;
    }
    renderComments(lines) {
        lines = helpers_1.FormatHelpers.breakLines(lines);
        const renderedLines = lines.map(line => ` * ${line}`).join('\n');
        return `/**
${renderedLines}
 */`;
    }
    /**
     * Render all the properties for the model by calling the property preset per property.
     */
    renderProperties() {
        return __awaiter(this, void 0, void 0, function* () {
            const properties = this.model.properties || {};
            const content = [];
            for (const [propertyName, property] of Object.entries(properties)) {
                const rendererProperty = yield this.runPropertyPreset(propertyName, property);
                content.push(rendererProperty);
            }
            if (this.model.additionalProperties !== undefined) {
                const propertyName = (0, NameHelpers_1.getUniquePropertyName)(this.model, NameHelpers_1.DefaultPropertyNames.additionalProperties);
                const additionalProperty = yield this.runPropertyPreset(propertyName, this.model.additionalProperties, models_1.PropertyType.additionalProperty);
                content.push(additionalProperty);
            }
            if (this.model.patternProperties !== undefined) {
                for (const [pattern, patternModel] of Object.entries(this.model.patternProperties)) {
                    const propertyName = (0, NameHelpers_1.getUniquePropertyName)(this.model, `${pattern}${NameHelpers_1.DefaultPropertyNames.patternProperties}`);
                    const renderedPatternProperty = yield this.runPropertyPreset(propertyName, patternModel, models_1.PropertyType.patternProperties);
                    content.push(renderedPatternProperty);
                }
            }
            return this.renderBlock(content);
        });
    }
    renderProperty(propertyName, property, type = models_1.PropertyType.property) {
        const formattedPropertyName = this.nameProperty(propertyName, property);
        let signature;
        switch (type) {
            case models_1.PropertyType.property:
                signature = this.renderTypeSignature(property, { isRequired: this.model.isRequired(propertyName) });
                return `${formattedPropertyName}${signature};`;
            case models_1.PropertyType.additionalProperty:
            case models_1.PropertyType.patternProperties:
                signature = this.renderType(property);
                return `${formattedPropertyName}?: Map<String, ${signature}>;`;
            default:
                return '';
        }
    }
    runPropertyPreset(propertyName, property, type = models_1.PropertyType.property) {
        return this.runPreset('property', { propertyName, property, type });
    }
}
exports.TypeScriptRenderer = TypeScriptRenderer;
//# sourceMappingURL=TypeScriptRenderer.js.map