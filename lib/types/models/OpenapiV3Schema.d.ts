export declare class OpenapiV3Xml {
    name?: string;
    namespace?: string;
    prefix?: string;
    attribute?: boolean;
    wrapped?: boolean;
    static toXml(object: any): OpenapiV3Xml;
}
export declare class OpenAPIV3ExternalDocumentation {
    description?: string;
    url?: string;
    [k: string]: any;
    static toExternalDocumentation(object: any): OpenAPIV3ExternalDocumentation;
}
export declare class OpenapiV3Discriminator {
    propertyName?: string;
    mapping?: {
        [k: string]: string;
    };
    static toDiscriminator(object: any): OpenapiV3Discriminator;
}
/**
 * OpenAPI 3.0 -> 3.0.4 schema model
 *
 * Based on Draft 6, but with restricted keywords and definitions
 * Modifications
 *  - type, cannot be an array nor contain 'null'
 *
 * Restrictions (keywords not allowed)
 *  - patternProperties
 *  - not
 *
 * https://swagger.io/specification/#schema-object
 */
export declare class OpenapiV3Schema {
    $schema?: string;
    title?: string;
    multipleOf?: number;
    maximum?: number;
    minimum?: number;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    maxItems?: number;
    minItems?: number;
    uniqueItems?: boolean;
    maxProperties?: number;
    minProperties?: number;
    allOf?: (OpenapiV3Schema | boolean)[];
    oneOf?: (OpenapiV3Schema | boolean)[];
    anyOf?: (OpenapiV3Schema | boolean)[];
    dependencies?: {
        [key: string]: OpenapiV3Schema | boolean | string[];
    };
    format?: string;
    definitions?: {
        [key: string]: OpenapiV3Schema | boolean;
    };
    description?: string;
    default?: any;
    type?: string | string[];
    enum?: any[];
    items?: OpenapiV3Schema | OpenapiV3Schema[] | boolean;
    properties?: {
        [key: string]: OpenapiV3Schema | boolean;
    };
    additionalProperties?: OpenapiV3Schema | boolean;
    $ref?: string;
    required?: string[];
    additionalItems?: OpenapiV3Schema | boolean;
    exclusiveMaximum?: number;
    exclusiveMinimum?: number;
    $id?: string;
    contains?: (OpenapiV3Schema | boolean);
    const?: any;
    propertyNames?: OpenapiV3Schema | boolean;
    examples?: any;
    nullable?: boolean;
    discriminator?: OpenapiV3Discriminator;
    xml?: OpenapiV3Xml;
    readOnly?: boolean;
    writeOnly?: boolean;
    externalDocs?: OpenAPIV3ExternalDocumentation;
    example?: any;
    deprecated?: boolean;
    [k: string]: any;
    /**
     * Takes a deep copy of the input object and converts it to an instance of OpenapiV3Schema.
     *
     * @param object
     */
    static toSchema(object: Record<string, unknown>): OpenapiV3Schema;
    private static internalToSchema;
}
//# sourceMappingURL=OpenapiV3Schema.d.ts.map