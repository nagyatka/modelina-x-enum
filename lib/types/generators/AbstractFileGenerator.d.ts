import { CommonInputModel, OutputModel } from '../models';
export declare type FileGenerator = (content: string, toFile: string) => Promise<void>;
/**
 * Abstract file generator which each file generator much implement.
 */
export interface AbstractFileGenerator<RenderCompleteModelOptions> {
    generateToFiles(input: Record<string, unknown> | CommonInputModel, outputDirectory: string, options: RenderCompleteModelOptions): Promise<OutputModel[]>;
}
//# sourceMappingURL=AbstractFileGenerator.d.ts.map