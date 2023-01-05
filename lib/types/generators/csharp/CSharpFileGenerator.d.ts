import { CSharpGenerator, CSharpRenderCompleteModelOptions } from './';
import { CommonInputModel, OutputModel } from '../../models';
import { AbstractFileGenerator } from '../AbstractFileGenerator';
export declare class CSharpFileGenerator extends CSharpGenerator implements AbstractFileGenerator<CSharpRenderCompleteModelOptions> {
    /**
     * Generates all the models to an output directory each model with their own separate files.
     *
     * @param input
     * @param outputDirectory where you want the models generated to
     * @param options
     */
    generateToFiles(input: Record<string, unknown> | CommonInputModel, outputDirectory: string, options: CSharpRenderCompleteModelOptions): Promise<OutputModel[]>;
}
//# sourceMappingURL=CSharpFileGenerator.d.ts.map