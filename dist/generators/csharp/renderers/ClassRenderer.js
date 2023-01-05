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
exports.CSHARP_DEFAULT_CLASS_PRESET = exports.ClassRenderer = void 0;
const CSharpRenderer_1 = require("../CSharpRenderer");
const models_1 = require("../../../models");
const helpers_1 = require("../../../helpers");
const change_case_1 = require("change-case");
/**
 * Renderer for CSharp's `struct` type
 *
 * @extends CSharpRenderer
 */
class ClassRenderer extends CSharpRenderer_1.CSharpRenderer {
    defaultSelf() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const content = [
                yield this.renderProperties(),
                yield this.runCtorPreset(),
                yield this.renderAccessors(),
                yield this.runAdditionalContentPreset(),
            ];
            if (((_a = this.options) === null || _a === void 0 ? void 0 : _a.collectionType) === 'List' ||
                this.model.additionalProperties !== undefined ||
                this.model.patternProperties !== undefined) {
                this.addDependency('using System.Collections.Generic;');
            }
            const formattedName = this.nameType(this.model.$id);
            return `public class ${formattedName}
{
${this.indent(this.renderBlock(content, 2))}
}`;
        });
    }
    renderProperties() {
        return __awaiter(this, void 0, void 0, function* () {
            const properties = this.model.properties || {};
            const content = [];
            for (const [propertyName, property] of Object.entries(properties)) {
                const rendererProperty = yield this.runPropertyPreset(propertyName, property, this.options);
                content.push(rendererProperty);
            }
            if (this.model.additionalProperties !== undefined) {
                const propertyName = (0, helpers_1.getUniquePropertyName)(this.model, helpers_1.DefaultPropertyNames.additionalProperties);
                const additionalProperty = yield this.runPropertyPreset(propertyName, this.model.additionalProperties, this.options, models_1.PropertyType.additionalProperty);
                content.push(additionalProperty);
            }
            if (this.model.patternProperties !== undefined) {
                for (const [pattern, patternModel] of Object.entries(this.model.patternProperties)) {
                    const propertyName = (0, helpers_1.getUniquePropertyName)(this.model, `${pattern}${helpers_1.DefaultPropertyNames.patternProperties}`);
                    const renderedPatternProperty = yield this.runPropertyPreset(propertyName, patternModel, this.options, models_1.PropertyType.patternProperties);
                    content.push(renderedPatternProperty);
                }
            }
            return this.renderBlock(content);
        });
    }
    renderAccessors() {
        return __awaiter(this, void 0, void 0, function* () {
            const properties = this.model.properties || {};
            const content = [];
            for (const [propertyName, property] of Object.entries(properties)) {
                content.push(yield this.runAccessorPreset(propertyName, property, this.options, models_1.PropertyType.property));
            }
            if (this.model.additionalProperties !== undefined) {
                const propertyName = (0, helpers_1.getUniquePropertyName)(this.model, helpers_1.DefaultPropertyNames.additionalProperties);
                content.push(yield this.runAccessorPreset(propertyName, this.model.additionalProperties, this.options, models_1.PropertyType.additionalProperty));
            }
            if (this.model.patternProperties !== undefined) {
                for (const [pattern, patternModel] of Object.entries(this.model.patternProperties)) {
                    const propertyName = (0, helpers_1.getUniquePropertyName)(this.model, `${pattern}${helpers_1.DefaultPropertyNames.patternProperties}`);
                    content.push(yield this.runAccessorPreset(propertyName, patternModel, this.options, models_1.PropertyType.patternProperties));
                }
            }
            return this.renderBlock(content, 2);
        });
    }
    runCtorPreset() {
        return this.runPreset('ctor');
    }
    runAccessorPreset(propertyName, property, options, type = models_1.PropertyType.property) {
        return this.runPreset('accessor', { propertyName, property, options, type });
    }
    runPropertyPreset(propertyName, property, options, type = models_1.PropertyType.property) {
        return this.runPreset('property', { propertyName, property, options, type });
    }
    runGetterPreset(propertyName, property, options, type = models_1.PropertyType.property) {
        return this.runPreset('getter', { propertyName, property, options, type });
    }
    runSetterPreset(propertyName, property, options, type = models_1.PropertyType.property) {
        return this.runPreset('setter', { propertyName, property, options, type });
    }
}
exports.ClassRenderer = ClassRenderer;
exports.CSHARP_DEFAULT_CLASS_PRESET = {
    self({ renderer }) {
        return renderer.defaultSelf();
    },
    property({ renderer, propertyName, options, property, type }) {
        return __awaiter(this, void 0, void 0, function* () {
            propertyName = renderer.nameProperty(propertyName, property);
            let propertyType = renderer.renderType(property, propertyName);
            if (type === models_1.PropertyType.additionalProperty || type === models_1.PropertyType.patternProperties) {
                propertyType = `Dictionary<string, ${propertyType}>`;
            }
            if (options === null || options === void 0 ? void 0 : options.autoImplementedProperties) {
                const getter = yield renderer.runGetterPreset(propertyName, property, options, type);
                const setter = yield renderer.runSetterPreset(propertyName, property, options, type);
                return `public ${propertyType} ${(0, change_case_1.pascalCase)(propertyName)} { ${getter} ${setter} }`;
            }
            return `private ${propertyType} ${propertyName};`;
        });
    },
    accessor({ renderer, propertyName, options, property, type }) {
        return __awaiter(this, void 0, void 0, function* () {
            const formattedAccessorName = (0, change_case_1.pascalCase)(renderer.nameProperty(propertyName, property));
            let propertyType = renderer.renderType(property, propertyName);
            if (type === models_1.PropertyType.additionalProperty || type === models_1.PropertyType.patternProperties) {
                propertyType = `Dictionary<string, ${propertyType}>`;
            }
            if (options === null || options === void 0 ? void 0 : options.autoImplementedProperties) {
                return '';
            }
            return `public ${propertyType} ${formattedAccessorName} 
{
  ${yield renderer.runGetterPreset(propertyName, property, options, type)}
  ${yield renderer.runSetterPreset(propertyName, property, options, type)}
}`;
        });
    },
    getter({ renderer, propertyName, options, property }) {
        if (options === null || options === void 0 ? void 0 : options.autoImplementedProperties) {
            return 'get;';
        }
        const formattedPropertyName = renderer.nameProperty(propertyName, property);
        return `get { return ${formattedPropertyName}; }`;
    },
    setter({ renderer, propertyName, options, property }) {
        if (options === null || options === void 0 ? void 0 : options.autoImplementedProperties) {
            return 'set;';
        }
        const formattedPropertyName = renderer.nameProperty(propertyName, property);
        return `set { ${formattedPropertyName} = value; }`;
    }
};
//# sourceMappingURL=ClassRenderer.js.map