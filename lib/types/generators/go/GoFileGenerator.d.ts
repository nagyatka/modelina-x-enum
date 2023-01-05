import { GoGenerator, GoRenderCompleteModelOptions } from './GoGenerator';
import { CommonInputModel, OutputModel } from '../../models';
import { AbstractFileGenerator } from '../AbstractFileGenerator';
export declare class GoFileGenerator extends GoGenerator implements AbstractFileGenerator<GoRenderCompleteModelOptions> {
    /**
     * Generates all the models to an output directory each model with their own separate files.
     *
     * @param input
     * @param outputDirectory where you want the models generated to
     * @param options
     */
    generateToFiles(input: Record<string, unknown> | CommonInputModel, outputDirectory: string, options: GoRenderCompleteModelOptions): Promise<OutputModel[]>;
}
//# sourceMappingURL=GoFileGenerator.d.ts.map