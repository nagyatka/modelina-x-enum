"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonNamingConventionImplementation = exports.getUniquePropertyName = exports.DefaultPropertyNames = void 0;
const helpers_1 = require("../helpers");
/**
 * Default property names for different aspects of the common model
 */
var DefaultPropertyNames;
(function (DefaultPropertyNames) {
    DefaultPropertyNames["additionalProperties"] = "additionalProperties";
    DefaultPropertyNames["patternProperties"] = "PatternProperties";
})(DefaultPropertyNames = exports.DefaultPropertyNames || (exports.DefaultPropertyNames = {}));
/**
 * Recursively find the proper property name.
 *
 * This function ensures that the property name is unique for the model
 *
 * @param rootModel
 * @param propertyName
 */
function getUniquePropertyName(rootModel, propertyName) {
    if (Object.keys(rootModel.properties || {}).includes(propertyName)) {
        return getUniquePropertyName(rootModel, `reserved_${propertyName}`);
    }
    return propertyName;
}
exports.getUniquePropertyName = getUniquePropertyName;
/**
 * A CommonNamingConvention implementation shared between generators for different languages.
 */
exports.CommonNamingConventionImplementation = {
    type: (name, ctx) => {
        if (!name) {
            return '';
        }
        let formattedName = helpers_1.FormatHelpers.toPascalCase(name);
        if (ctx.reservedKeywordCallback !== undefined && ctx.reservedKeywordCallback(formattedName)) {
            formattedName = helpers_1.FormatHelpers.toPascalCase(`reserved_${formattedName}`);
        }
        return formattedName;
    },
    property: (name, ctx) => {
        if (!name) {
            return '';
        }
        let formattedName = helpers_1.FormatHelpers.toCamelCase(name);
        if (ctx.reservedKeywordCallback !== undefined && ctx.reservedKeywordCallback(formattedName)) {
            // If name is considered reserved, make sure we rename it appropriately
            // and make sure no clashes occur.
            formattedName = helpers_1.FormatHelpers.toCamelCase(`reserved_${formattedName}`);
            if (Object.keys(ctx.model.properties || {}).includes(formattedName)) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                return exports.CommonNamingConventionImplementation.property(`reserved_${formattedName}`, ctx);
            }
        }
        return formattedName;
    }
};
//# sourceMappingURL=NameHelpers.js.map