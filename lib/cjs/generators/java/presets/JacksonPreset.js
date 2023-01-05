"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JAVA_JACKSON_PRESET = void 0;
const models_1 = require("../../../models");
/**
 * Preset which adds `com.fasterxml.jackson` related annotations to class's property getters.
 *
 * @implements {JavaPreset}
 */
exports.JAVA_JACKSON_PRESET = {
    class: {
        self({ renderer, content }) {
            renderer.addDependency('import com.fasterxml.jackson.annotation.*;');
            return content;
        },
        getter({ renderer, propertyName, content, type }) {
            if (type === models_1.PropertyType.property) {
                const annotation = renderer.renderAnnotation('JsonProperty', `"${propertyName}"`);
                return renderer.renderBlock([annotation, content]);
            }
            return renderer.renderBlock([content]);
        },
    },
    enum: {
        self({ renderer, content }) {
            renderer.addDependency('import com.fasterxml.jackson.annotation.*;');
            return content;
        },
        getValue({ content }) {
            return `@JsonValue
${content}`;
        },
        fromValue({ content }) {
            return `@JsonCreator
${content}`;
        },
    }
};
//# sourceMappingURL=JacksonPreset.js.map