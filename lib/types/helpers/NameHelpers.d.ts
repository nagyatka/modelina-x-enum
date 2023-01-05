import { CommonInputModel, CommonModel } from '../models';
/**
 * Default property names for different aspects of the common model
 */
export declare enum DefaultPropertyNames {
    additionalProperties = "additionalProperties",
    patternProperties = "PatternProperties"
}
/**
 * Recursively find the proper property name.
 *
 * This function ensures that the property name is unique for the model
 *
 * @param rootModel
 * @param propertyName
 */
export declare function getUniquePropertyName(rootModel: CommonModel, propertyName: string): string;
/**
 * The common naming convention context type.
 */
export declare type CommonTypeNamingConventionCtx = {
    model: CommonModel;
    inputModel: CommonInputModel;
    reservedKeywordCallback?: (name: string) => boolean;
};
export declare type CommonPropertyNamingConventionCtx = {
    model: CommonModel;
    inputModel: CommonInputModel;
    property?: CommonModel;
    reservedKeywordCallback?: (name: string) => boolean;
};
/**
 * The common naming convention type shared between generators for different languages.
 */
export declare type CommonNamingConvention = {
    type?: (name: string | undefined, ctx: CommonTypeNamingConventionCtx) => string;
    property?: (name: string | undefined, ctx: CommonPropertyNamingConventionCtx) => string;
};
/**
 * A CommonNamingConvention implementation shared between generators for different languages.
 */
export declare const CommonNamingConventionImplementation: CommonNamingConvention;
//# sourceMappingURL=NameHelpers.d.ts.map