export declare class AsyncapiV2ExternalDocumentation {
    description?: string;
    url?: string;
    [k: string]: any;
    static toExternalDocumentation(object: any): AsyncapiV2ExternalDocumentation;
}
/**
 * AsyncAPI schema model
 *
 * Based on Draft 7 with additions
 *
 * https://www.asyncapi.com/docs/specifications/v2.0.0#schemaObject
 * https://www.asyncapi.com/docs/specifications/v2.1.0#schemaObject
 * https://www.asyncapi.com/docs/specifications/v2.2.0#schemaObject
 * https://www.asyncapi.com/docs/specifications/v2.3.0#schemaObject
 */
export declare class AsyncapiV2Schema {
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
    allOf?: (AsyncapiV2Schema | boolean)[];
    oneOf?: (AsyncapiV2Schema | boolean)[];
    anyOf?: (AsyncapiV2Schema | boolean)[];
    not?: (AsyncapiV2Schema | boolean);
    dependencies?: {
        [key: string]: AsyncapiV2Schema | boolean | string[];
    };
    format?: string;
    definitions?: {
        [key: string]: AsyncapiV2Schema | boolean;
    };
    description?: string;
    default?: any;
    type?: string | string[];
    enum?: any[];
    items?: AsyncapiV2Schema | AsyncapiV2Schema[] | boolean;
    properties?: {
        [key: string]: AsyncapiV2Schema | boolean;
    };
    additionalProperties?: AsyncapiV2Schema | boolean;
    patternProperties?: {
        [key: string]: AsyncapiV2Schema | boolean;
    };
    $ref?: string;
    required?: string[];
    additionalItems?: AsyncapiV2Schema | boolean;
    exclusiveMaximum?: number;
    exclusiveMinimum?: number;
    $id?: string;
    contains?: AsyncapiV2Schema | boolean;
    const?: any;
    propertyNames?: AsyncapiV2Schema | boolean;
    examples?: any[];
    $comment?: string;
    if?: AsyncapiV2Schema | boolean;
    then?: AsyncapiV2Schema | boolean;
    else?: AsyncapiV2Schema | boolean;
    readOnly?: boolean;
    writeOnly?: boolean;
    contentEncoding?: string;
    contentMediaType?: string;
    discriminator?: string;
    externalDocs?: AsyncapiV2ExternalDocumentation;
    deprecated?: boolean;
    [k: string]: any;
    /**
     * Takes a deep copy of the input object and converts it to an instance of AsyncapiV2Schema.
     *
     * @param object
     */
    static toSchema(object: Record<string, unknown>): AsyncapiV2Schema;
    private static internalToSchema;
}
//# sourceMappingURL=AsyncapiV2Schema.d.ts.map