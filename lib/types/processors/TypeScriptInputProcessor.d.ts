import { CommonInputModel, ProcessorOptions } from '../models';
import * as TJS from 'typescript-json-schema';
import { AbstractInputProcessor } from './AbstractInputProcessor';
/** Class for processing Typescript code inputs to Common module*/
export interface TypeScriptInputProcessorOptions extends TJS.PartialArgs {
    uniqueNames?: boolean;
    required?: boolean;
    compilerOptions?: TJS.CompilerOptions;
}
export declare class TypeScriptInputProcessor extends AbstractInputProcessor {
    static settings: TypeScriptInputProcessorOptions;
    private generateProgram;
    private generateJSONSchema;
    shouldProcess(input: Record<string, any>): boolean;
    process(input: Record<string, any>, options?: ProcessorOptions): Promise<CommonInputModel>;
}
//# sourceMappingURL=TypeScriptInputProcessor.d.ts.map