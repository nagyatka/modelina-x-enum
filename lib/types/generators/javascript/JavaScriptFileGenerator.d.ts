import { JavaScriptGenerator, JavaScriptRenderCompleteModelOptions } from './';
import { CommonInputModel, OutputModel } from '../../models';
import { AbstractFileGenerator } from '../AbstractFileGenerator';
export declare class JavaScriptFileGenerator extends JavaScriptGenerator implements AbstractFileGenerator<JavaScriptRenderCompleteModelOptions> {
    /**
     * Generates all the models to an output directory each model with their own separate files.
     *
     * @param input
     * @param outputDirectory where you want the models generated to
     * @param options
     */
    generateToFiles(input: Record<string, unknown> | CommonInputModel, outputDirectory: string, options?: JavaScriptRenderCompleteModelOptions): Promise<OutputModel[]>;
}
//# sourceMappingURL=JavaScriptFileGenerator.d.ts.map