import { Schema as AsyncAPISchema } from '@asyncapi/parser';
import { AbstractInputProcessor } from './AbstractInputProcessor';
import { CommonInputModel, ProcessorOptions } from '../models';
import { AsyncapiV2Schema } from '../models/AsyncapiV2Schema';
/**
 * Class for processing AsyncAPI inputs
 */
export declare class AsyncAPIInputProcessor extends AbstractInputProcessor {
    static supportedVersions: string[];
    /**
     * Process the input as an AsyncAPI document
     *
     * @param input
     */
    process(input: Record<string, any>, options?: ProcessorOptions): Promise<CommonInputModel>;
    /**
     *
     * Reflect the name of the schema and save it to `x-modelgen-inferred-name` extension.
     *
     * This keeps the the id of the model deterministic if used in conjunction with other AsyncAPI tools such as the generator.
     *
     * @param schema to reflect name for
     */
    static convertToInternalSchema(schema: AsyncAPISchema | boolean, alreadyIteratedSchemas?: Map<string, AsyncapiV2Schema>): AsyncapiV2Schema | boolean;
    /**
       * Figures out if an object is of type AsyncAPI document
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
    /**
     * Figure out if input is from the AsyncAPI js parser.
     *
     * @param input
     */
    static isFromParser(input: Record<string, any>): boolean;
}
//# sourceMappingURL=AsyncAPIInputProcessor.d.ts.map