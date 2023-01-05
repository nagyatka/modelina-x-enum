import { TypeScriptGenerator, TypeScriptRenderCompleteModelOptions } from './';
import { CommonInputModel, OutputModel } from '../../models';
import { AbstractFileGenerator } from '../AbstractFileGenerator';
export declare class TypeScriptFileGenerator extends TypeScriptGenerator implements AbstractFileGenerator<TypeScriptRenderCompleteModelOptions> {
    /**
     * Generates all the models to an output directory each model with their own separate files.
     *
     * @param input
     * @param outputDirectory where you want the models generated to
     * @param options
     */
    generateToFiles(input: Record<string, unknown> | CommonInputModel, outputDirectory: string, options?: TypeScriptRenderCompleteModelOptions): Promise<OutputModel[]>;
}
//# sourceMappingURL=TypeScriptFileGenerator.d.ts.map