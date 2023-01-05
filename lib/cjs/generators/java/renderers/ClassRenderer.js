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
exports.JAVA_DEFAULT_CLASS_PRESET = exports.ClassRenderer = void 0;
const JavaRenderer_1 = require("../JavaRenderer");
const models_1 = require("../../../models");
const helpers_1 = require("../../../helpers");
/**
 * Renderer for Java's `class` type
 *
 * @extends JavaRenderer
 */
class ClassRenderer extends JavaRenderer_1.JavaRenderer {
    defaultSelf() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const content = [
                yield this.renderProperties(),
                yield this.runCtorPreset(),
                yield this.renderAccessors(),
                yield this.runAdditionalContentPreset(),
            ];
            if (((_a = this.options) === null || _a === void 0 ? void 0 : _a.collectionType) === 'List') {
                this.addDependency('import java.util.List;');
            }
            if (this.model.additionalProperties !== undefined || this.model.patternProperties !== undefined) {
                this.addDependency('import java.util.Map;');
            }
            const formattedName = this.nameType(`${this.model.$id}`);
            return `public class ${formattedName} {
${this.indent(this.renderBlock(content, 2))}
}`;
        });
    }
    runCtorPreset() {
        return this.runPreset('ctor');
    }
    /**
     * Render all the properties for the class.
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
    /**
     * Render all the accessors for the properties
     */
    renderAccessors() {
        return __awaiter(this, void 0, void 0, function* () {
            const properties = this.model.properties || {};
            const content = [];
            for (const [propertyName, property] of Object.entries(properties)) {
                const getter = yield this.runGetterPreset(propertyName, property);
                const setter = yield this.runSetterPreset(propertyName, property);
                content.push(this.renderBlock([getter, setter]));
            }
            if (this.model.additionalProperties !== undefined) {
                const propertyName = (0, helpers_1.getUniquePropertyName)(this.model, helpers_1.DefaultPropertyNames.additionalProperties);
                const getter = yield this.runGetterPreset(propertyName, this.model.additionalProperties, models_1.PropertyType.additionalProperty);
                const setter = yield this.runSetterPreset(propertyName, this.model.additionalProperties, models_1.PropertyType.additionalProperty);
                content.push(this.renderBlock([getter, setter]));
            }
            if (this.model.patternProperties !== undefined) {
                for (const [pattern, patternModel] of Object.entries(this.model.patternProperties)) {
                    const propertyName = (0, helpers_1.getUniquePropertyName)(this.model, `${pattern}${helpers_1.DefaultPropertyNames.patternProperties}`);
                    const getter = yield this.runGetterPreset(propertyName, patternModel, models_1.PropertyType.patternProperties);
                    const setter = yield this.runSetterPreset(propertyName, patternModel, models_1.PropertyType.patternProperties);
                    content.push(this.renderBlock([getter, setter]));
                }
            }
            return this.renderBlock(content, 2);
        });
    }
    runGetterPreset(propertyName, property, type = models_1.PropertyType.property) {
        return this.runPreset('getter', { propertyName, property, type });
    }
    runSetterPreset(propertyName, property, type = models_1.PropertyType.property) {
        return this.runPreset('setter', { propertyName, property, type });
    }
}
exports.ClassRenderer = ClassRenderer;
exports.JAVA_DEFAULT_CLASS_PRESET = {
    self({ renderer }) {
        return renderer.defaultSelf();
    },
    property({ renderer, propertyName, property, type }) {
        propertyName = renderer.nameProperty(propertyName, property);
        let propertyType = renderer.renderType(property);
        if (type === models_1.PropertyType.additionalProperty || type === models_1.PropertyType.patternProperties) {
            propertyType = `Map<String, ${propertyType}>`;
        }
        return `private ${propertyType} ${propertyName};`;
    },
    getter({ renderer, propertyName, property, type }) {
        const formattedPropertyName = renderer.nameProperty(propertyName, property);
        const getterName = `get${helpers_1.FormatHelpers.toPascalCase(propertyName)}`;
        let getterType = renderer.renderType(property);
        if (type === models_1.PropertyType.additionalProperty || type === models_1.PropertyType.patternProperties) {
            getterType = `Map<String, ${getterType}>`;
        }
        return `public ${getterType} ${getterName}() { return this.${formattedPropertyName}; }`;
    },
    setter({ renderer, propertyName, property, type }) {
        const formattedPropertyName = renderer.nameProperty(propertyName, property);
        const setterName = helpers_1.FormatHelpers.toPascalCase(propertyName);
        let setterType = renderer.renderType(property);
        if (type === models_1.PropertyType.additionalProperty || type === models_1.PropertyType.patternProperties) {
            setterType = `Map<String, ${setterType}>`;
        }
        return `public void set${setterName}(${setterType} ${formattedPropertyName}) { this.${formattedPropertyName} = ${formattedPropertyName}; }`;
    }
};
//# sourceMappingURL=ClassRenderer.js.map