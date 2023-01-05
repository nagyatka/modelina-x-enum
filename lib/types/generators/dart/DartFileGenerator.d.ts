import { DartGenerator, DartRenderCompleteModelOptions } from './';
import { CommonInputModel, OutputModel } from '../../models';
import { AbstractFileGenerator } from '../AbstractFileGenerator';
export declare class DartFileGenerator extends DartGenerator implements AbstractFileGenerator<DartRenderCompleteModelOptions> {
    /**
     * Generates all the models to an output directory each model with their own separate files.
     *
     * @param input
     * @param outputDirectory where you want the models generated to
     * @param options
     */
    generateToFiles(input: Record<string, unknown> | CommonInputModel, outputDirectory: string, options: DartRenderCompleteModelOptions): Promise<OutputModel[]>;
}
//# sourceMappingURL=DartFileGenerator.d.ts.map