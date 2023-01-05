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
exports.DART_DEFAULT_CLASS_PRESET = exports.ClassRenderer = void 0;
const DartRenderer_1 = require("../DartRenderer");
const models_1 = require("../../../models");
const helpers_1 = require("../../../helpers");
/**
 * Renderer for Dart's `class` type
 *
 * @extends DartRenderer
 */
class ClassRenderer extends DartRenderer_1.DartRenderer {
    defaultSelf() {
        return __awaiter(this, void 0, void 0, function* () {
            const content = [
                yield this.renderProperties(),
                yield this.runCtorPreset(),
                yield this.renderAccessors(),
                yield this.runAdditionalContentPreset(),
            ];
            const formattedName = this.nameType(`${this.model.$id}`);
            return `class ${formattedName} {
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
    // eslint-disable-next-line require-await
    renderAccessors() {
        return __awaiter(this, void 0, void 0, function* () {
            const content = [];
            return this.renderBlock(content, 2);
        });
    }
}
exports.ClassRenderer = ClassRenderer;
exports.DART_DEFAULT_CLASS_PRESET = {
    self({ renderer }) {
        return renderer.defaultSelf();
    },
    property({ renderer, propertyName, property, type }) {
        propertyName = renderer.nameProperty(propertyName, property);
        let propertyType = renderer.renderType(property);
        if (type === models_1.PropertyType.additionalProperty || type === models_1.PropertyType.patternProperties) {
            propertyType = `Map<String, ${propertyType}>`;
        }
        return `${propertyType}? ${propertyName};`;
    },
    ctor({ renderer, model }) {
        return `${renderer.nameType(model.$id)}();`;
    }
};
//# sourceMappingURL=ClassRenderer.js.map