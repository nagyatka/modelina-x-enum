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
exports.TS_DEFAULT_CLASS_PRESET = exports.ClassRenderer = void 0;
const TypeScriptRenderer_1 = require("../TypeScriptRenderer");
const models_1 = require("../../../models");
const helpers_1 = require("../../../helpers");
/**
 * Renderer for TypeScript's `class` type
 *
 * @extends TypeScriptRenderer
 */
class ClassRenderer extends TypeScriptRenderer_1.TypeScriptRenderer {
    defaultSelf() {
        return __awaiter(this, void 0, void 0, function* () {
            const content = [
                yield this.renderProperties(),
                yield this.runCtorPreset(),
                yield this.renderAccessors(),
                yield this.runAdditionalContentPreset()
            ];
            const formattedName = this.nameType(this.model.$id);
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
exports.TS_DEFAULT_CLASS_PRESET = {
    self({ renderer }) {
        return renderer.defaultSelf();
    },
    ctor({ renderer, model }) {
        const properties = model.properties || {};
        const assignments = Object.entries(properties).map(([propertyName, property]) => {
            propertyName = renderer.nameProperty(propertyName, property);
            return `this._${propertyName} = input.${propertyName};`;
        });
        const ctorProperties = Object.entries(properties).map(([propertyName, property]) => {
            return renderer.renderProperty(propertyName, property).replace(';', ',');
        });
        return `constructor(input: {
${renderer.indent(renderer.renderBlock(ctorProperties))}
}) {
${renderer.indent(renderer.renderBlock(assignments))}
}`;
    },
    property({ renderer, propertyName, property, type }) {
        return `private _${renderer.renderProperty(propertyName, property, type)}`;
    },
    getter({ renderer, model, propertyName, property, type }) {
        const isRequired = model.isRequired(propertyName);
        propertyName = renderer.nameProperty(propertyName, property);
        let signature = '';
        if (type === models_1.PropertyType.property) {
            signature = renderer.renderTypeSignature(property, { orUndefined: !isRequired });
        }
        else if (type === models_1.PropertyType.additionalProperty || type === models_1.PropertyType.patternProperties) {
            const mapType = renderer.renderType(property);
            signature = `: Map<String, ${mapType}> | undefined`;
        }
        return `get ${propertyName}()${signature} { return this._${propertyName}; }`;
    },
    setter({ renderer, model, propertyName, property, type }) {
        const isRequired = model.isRequired(propertyName);
        propertyName = renderer.nameProperty(propertyName, property);
        let signature = '';
        if (type === models_1.PropertyType.property) {
            signature = renderer.renderTypeSignature(property, { orUndefined: !isRequired });
        }
        else if (type === models_1.PropertyType.additionalProperty || type === models_1.PropertyType.patternProperties) {
            const mapType = renderer.renderType(property);
            signature = `: Map<String, ${mapType}> | undefined`;
        }
        return `set ${propertyName}(${propertyName}${signature}) { this._${propertyName} = ${propertyName}; }`;
    },
};
//# sourceMappingURL=ClassRenderer.js.map