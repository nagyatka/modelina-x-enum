import { CommonModel } from '../models/CommonModel';
/**
 * Check if CommonModel is an enum
 *
 * @param model
 */
export declare function isEnum(model: CommonModel): boolean;
/**
 * Check if CommonModel is a separate model or a simple model.
 * @param model
 */
export declare function isModelObject(model: CommonModel): boolean;
export declare function isUnionType(model: CommonModel): boolean;
/**
 * Infers the JSON Schema type from value
 *
 * @param value to infer type of
 */
export declare function inferTypeFromValue(value: any): string;
/**
 * Find the name for simplified version of schema
 *
 * @param schema to find the name
 */
export declare function interpretName(schema: any | boolean): string | undefined;
//# sourceMappingURL=Utils.d.ts.map