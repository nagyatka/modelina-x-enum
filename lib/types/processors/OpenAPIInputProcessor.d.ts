import { AbstractInputProcessor } from './AbstractInputProcessor';
import { CommonInputModel, OpenapiV3Schema } from '../models';
import { OpenAPIV3 } from 'openapi-types';
/**
 * Class for processing OpenAPI V3.0 inputs
 */
export declare class OpenAPIInputProcessor extends AbstractInputProcessor {
    static supportedVersions: string[];
    /**
     * Process the input as a OpenAPI V3.0 document
     *
     * @param input
     */
    process(input: Record<string, any>): Promise<CommonInputModel>;
    private processPath;
    private processOperation;
    private iterateResponses;
    private iterateMediaType;
    private includeSchema;
    /**
     * Converts a schema to the internal schema format.
     *
     * @param schema to convert
     * @param name of the schema
     */
    static convertToInternalSchema(schema: OpenAPIV3.SchemaObject, name: string): OpenapiV3Schema;
    /**
       * Figures out if an object is of type OpenAPI V3.0.x document and supported
       *
       * @param input
       */
    shouldProcess(input: Record<string, any>): boolean;
    /**
     * Try to find the AsyncAPI version from the input. If it cannot undefined are returned, if it can, the version is returned.
     *
     * @param input
     */
    tryGetVersionOfDocument(input: Record<string, any>): string | undefined;
}
//# sourceMappingURL=OpenAPIInputProcessor.d.ts.map