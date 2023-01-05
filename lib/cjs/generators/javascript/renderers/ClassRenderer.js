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
exports.JS_DEFAULT_CLASS_PRESET = exports.ClassRenderer = void 0;
const JavaScriptRenderer_1 = require("../JavaScriptRenderer");
const models_1 = require("../../../models");
const helpers_1 = require("../../../helpers");
/**
 * Renderer for JavaScript's `class` type
 *
 * @extends JavaScriptRenderer
 */
class ClassRenderer extends JavaScriptRenderer_1.JavaScriptRenderer {
    defaultSelf() {
        return __awaiter(this, void 0, void 0, function* () {
            const content = [
                yield this.renderProperties(),
                yield this.runCtorPreset(),
                yield this.renderAccessors(),
                yield this.runAdditionalContentPreset()
            ];
            const formattedName = this.model.$id && helpers_1.FormatHelpers.toPascalCase(this.model.$id);
            return `class ${formattedName} {
${this.indent(this.renderBlock(content, 2))}
}`;
        });
    }
    runCtorPreset() {
        return this.runPreset('ctor');
    }
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
exports.JS_DEFAULT_CLASS_PRESET = {
    self({ renderer }) {
        return renderer.defaultSelf();
    },
    ctor({ renderer, model }) {
        const properties = model.properties || {};
        const assigments = Object.entries(properties).map(([propertyName, property]) => {
            if (!model.isRequired(propertyName)) {
                propertyName = renderer.nameProperty(propertyName, property);
                return `if (input.hasOwnProperty('${propertyName}')) {
  this.${propertyName} = input.${propertyName};
}`;
            }
            propertyName = renderer.nameProperty(propertyName, property);
            return `this.${propertyName} = input.${propertyName};`;
        });
        const body = renderer.renderBlock(assigments);
        return `constructor(input) {
${renderer.indent(body)}
}`;
    },
    property({ renderer, propertyName, property }) {
        propertyName = renderer.nameProperty(propertyName, property);
        return `${propertyName};`;
    },
    getter({ renderer, propertyName, property }) {
        propertyName = renderer.nameProperty(propertyName, property);
        return `get ${propertyName}() { return this.${propertyName}; }`;
    },
    setter({ renderer, propertyName, property }) {
        propertyName = renderer.nameProperty(propertyName, property);
        return `set ${propertyName}(${propertyName}) { this.${propertyName} = ${propertyName}; }`;
    },
};
//# sourceMappingURL=ClassRenderer.js.map