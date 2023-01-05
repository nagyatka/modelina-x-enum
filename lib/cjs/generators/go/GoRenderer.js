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
exports.GoRenderer = void 0;
const AbstractRenderer_1 = require("../AbstractRenderer");
const FormatHelpers_1 = require("../../helpers/FormatHelpers");
const helpers_1 = require("../../helpers");
const GoPreset_1 = require("./GoPreset");
const Constants_1 = require("./Constants");
/**
 * Common renderer for Go types
 *
 * @extends AbstractRenderer
 */
class GoRenderer extends AbstractRenderer_1.AbstractRenderer {
    constructor(options, generator, presets, model, inputModel) {
        super(options, generator, presets, model, inputModel);
    }
    renderFields() {
        return __awaiter(this, void 0, void 0, function* () {
            const fields = this.model.properties || {};
            const content = [];
            for (const [fieldName, field] of Object.entries(fields)) {
                const renderField = yield this.runFieldPreset(fieldName, field);
                content.push(renderField);
            }
            if (this.model.additionalProperties !== undefined) {
                const propertyName = (0, helpers_1.getUniquePropertyName)(this.model, helpers_1.DefaultPropertyNames.additionalProperties);
                const additionalProperty = yield this.runFieldPreset(propertyName, this.model.additionalProperties, GoPreset_1.FieldType.additionalProperty);
                content.push(additionalProperty);
            }
            if (this.model.patternProperties !== undefined) {
                for (const [pattern, patternModel] of Object.entries(this.model.patternProperties)) {
                    const propertyName = (0, helpers_1.getUniquePropertyName)(this.model, `${pattern}${helpers_1.DefaultPropertyNames.patternProperties}`);
                    const renderedPatternProperty = yield this.runFieldPreset(propertyName, patternModel, GoPreset_1.FieldType.patternProperties);
                    content.push(renderedPatternProperty);
                }
            }
            return this.renderBlock(content);
        });
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
            ? this.options.namingConvention.type(name, { model: model || this.model, inputModel: this.inputModel, reservedKeywordCallback: Constants_1.isReservedGoKeyword })
            : name || '';
    }
    /**
     * Renders the name of a field based on provided generator option naming convention field function.
     *
     * @param fieldName
     * @param field
     */
    nameField(fieldName, field) {
        var _a, _b;
        return ((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.namingConvention) === null || _b === void 0 ? void 0 : _b.field)
            ? this.options.namingConvention.field(fieldName, { model: this.model, inputModel: this.inputModel, field, reservedKeywordCallback: Constants_1.isReservedGoKeyword })
            : fieldName || '';
    }
    runFieldPreset(fieldName, field, type = GoPreset_1.FieldType.field) {
        return this.runPreset('field', { fieldName, field, type });
    }
    renderType(model) {
        if (model.$ref !== undefined) {
            const formattedRef = this.nameType(model.$ref);
            return `*${formattedRef}`;
        }
        if (Array.isArray(model.type)) {
            return model.type.length > 1 ? '[]interface{}' : `[]${this.toGoType(model.type[0], model)}`;
        }
        return this.toGoType(model.type, model);
    }
    renderComments(lines) {
        lines = FormatHelpers_1.FormatHelpers.breakLines(lines);
        return lines.map(line => `// ${line}`).join('\n');
    }
    /* eslint-disable sonarjs/no-duplicate-string */
    toGoType(type, model) {
        switch (type) {
            case 'string':
                return 'string';
            case 'integer':
                return 'int';
            case 'number':
                return 'float64';
            case 'boolean':
                return 'bool';
            case 'object':
                return 'interface{}';
            case 'array': {
                if (Array.isArray(model.items)) {
                    return model.items.length > 1 ? '[]interface{}' : `[]${this.renderType(model.items[0])}`;
                }
                const arrayType = model.items ? this.renderType(model.items) : 'interface{}';
                return `[]${arrayType}`;
            }
            default: return 'interface{}';
        }
    }
}
exports.GoRenderer = GoRenderer;
//# sourceMappingURL=GoRenderer.js.map