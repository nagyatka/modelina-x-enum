import { AbstractInputProcessor } from './AbstractInputProcessor';
import { CommonInputModel, SwaggerV2Schema } from '../models';
import { OpenAPIV2 } from 'openapi-types';
/**
 * Class for processing Swagger inputs
 */
export declare class SwaggerInputProcessor extends AbstractInputProcessor {
    static supportedVersions: string[];
    /**
     * Process the input as a Swagger document
     *
     * @param input
     */
    process(input: Record<string, any>): Promise<CommonInputModel>;
    private processOperation;
    private includeResponses;
    private includeParameters;
    /**
     * Converts a Swagger 2.0 Schema to the internal schema format.
     *
     * @param schema to convert
     * @param name of the schema
     */
    static convertToInternalSchema(schema: OpenAPIV2.SchemaObject, name: string): SwaggerV2Schema;
    /**
       * Figures out if an object is of type Swagger document and supported
       *
       * @param input
       */
    shouldProcess(input: Record<string, any>): boolean;
    /**
     * Try to find the swagger version from the input. If it cannot, undefined are returned, if it can, the version is returned.
     *
     * @param input
     */
    tryGetVersionOfDocument(input: Record<string, any>): string | undefined;
}
//# sourceMappingURL=SwaggerInputProcessor.d.ts.map