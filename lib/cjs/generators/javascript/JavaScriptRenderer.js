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
exports.JavaScriptRenderer = void 0;
const AbstractRenderer_1 = require("../AbstractRenderer");
const helpers_1 = require("../../helpers");
const models_1 = require("../../models");
const Constants_1 = require("./Constants");
/**
 * Common renderer for JavaScript types
 *
 * @extends AbstractRenderer
 */
class JavaScriptRenderer extends AbstractRenderer_1.AbstractRenderer {
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
            ? this.options.namingConvention.type(name, { model: model || this.model, inputModel: this.inputModel, reservedKeywordCallback: Constants_1.isReservedJavaScriptKeyword })
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
            ? this.options.namingConvention.property(propertyName, { model: this.model, inputModel: this.inputModel, property, reservedKeywordCallback: Constants_1.isReservedJavaScriptKeyword })
            : propertyName || '';
    }
    renderComments(lines) {
        lines = helpers_1.FormatHelpers.breakLines(lines);
        const content = lines.map(line => ` * ${line}`).join('\n');
        return `/**
${content}
 */`;
    }
    renderProperties() {
        return __awaiter(this, void 0, void 0, function* () {
            const properties = this.model.properties || {};
            const content = [];
            for (const [propertyName, property] of Object.entries(properties)) {
                const rendererProperty = yield this.runPropertyPreset(propertyName, property);
                content.push(rendererProperty);
            }
            if (this.model.additionalProperties !== undefined) {
                const propertyName = (0, helpers_1.getUniquePropertyName)(this.model, helpers_1.DefaultPropertyNames.additionalProperties);
                const additionalProperty = yield this.runPropertyPreset(propertyName, this.model.additionalProperties, models_1.PropertyType.additionalProperty);
                content.push(additionalProperty);
            }
            if (this.model.patternProperties !== undefined) {
                for (const [pattern, patternModel] of Object.entries(this.model.patternProperties)) {
                    const propertyName = (0, helpers_1.getUniquePropertyName)(this.model, `${pattern}${helpers_1.DefaultPropertyNames.patternProperties}`);
                    const renderedPatternProperty = yield this.runPropertyPreset(propertyName, patternModel, models_1.PropertyType.patternProperties);
                    content.push(renderedPatternProperty);
                }
            }
            return this.renderBlock(content);
        });
    }
    runPropertyPreset(propertyName, property, type = models_1.PropertyType.property) {
        return this.runPreset('property', { propertyName, property, type });
    }
}
exports.JavaScriptRenderer = JavaScriptRenderer;
//# sourceMappingURL=JavaScriptRenderer.js.map