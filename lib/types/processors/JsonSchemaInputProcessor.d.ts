import { AbstractInputProcessor } from './AbstractInputProcessor';
import { CommonModel, CommonInputModel, Draft4Schema, Draft7Schema, Draft6Schema, SwaggerV2Schema, OpenapiV3Schema, AsyncapiV2Schema } from '../models';
/**
 * Class for processing JSON Schema
 */
export declare class JsonSchemaInputProcessor extends AbstractInputProcessor {
    /**
     * Function for processing a JSON Schema input.
     *
     * @param input
     */
    process(input: Record<string, any>): Promise<CommonInputModel>;
    /**
     * Unless the schema states one that is not supported we assume its of type JSON Schema
     *
     * @param input
     */
    shouldProcess(input: Record<string, any>): boolean;
    /**
     * Process a draft-7 schema
     *
     * @param input to process as draft 7
     */
    private processDraft7;
    /**
     * Process a draft-4 schema
     *
     * @param input to process as draft 4
     */
    private processDraft4;
    /**
     * Process a draft-6 schema
     *
     * @param input to process as draft-6
     */
    private processDraft6;
    private dereferenceInputs;
    /**
     * Each schema must have a name, so when later interpreted, the model have the most accurate model name.
     *
     * Reflect name from given schema and save it to `x-modelgen-inferred-name` extension.
     *
     * This reflects all the common keywords that are shared between draft-4, draft-7 and Swagger 2.0 Schema
     *
     * @param schema to process
     * @param namesStack is a aggegator of previous used names
     * @param name to infer
     * @param isRoot indicates if performed schema is a root schema
     */
    static reflectSchemaNames(schema: Draft4Schema | Draft6Schema | Draft7Schema | SwaggerV2Schema | OpenapiV3Schema | boolean, namesStack: Record<string, number>, name?: string, isRoot?: boolean): any;
    /**
     * Ensure schema name using previous name and new part
     *
     * @param previousName to concatenate with
     * @param newParts
     */
    private static ensureNamePattern;
    /**
     * Simplifies a JSON Schema into a common models
     *
     * @param schema to simplify to common model
     */
    static convertSchemaToCommonModel(schema: Draft4Schema | Draft6Schema | Draft7Schema | SwaggerV2Schema | AsyncapiV2Schema | boolean): Record<string, CommonModel>;
}
//# sourceMappingURL=JsonSchemaInputProcessor.d.ts.map