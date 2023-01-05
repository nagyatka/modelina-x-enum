import { JavaGenerator, JavaRenderCompleteModelOptions } from './';
import { CommonInputModel, OutputModel } from '../../models';
import { AbstractFileGenerator } from '../AbstractFileGenerator';
export declare class JavaFileGenerator extends JavaGenerator implements AbstractFileGenerator<JavaRenderCompleteModelOptions> {
    /**
     * Generates all the models to an output directory each model with their own separate files.
     *
     * @param input
     * @param outputDirectory where you want the models generated to
     * @param options
     */
    generateToFiles(input: Record<string, unknown> | CommonInputModel, outputDirectory: string, options: JavaRenderCompleteModelOptions): Promise<OutputModel[]>;
}
//# sourceMappingURL=JavaFileGenerator.d.ts.map