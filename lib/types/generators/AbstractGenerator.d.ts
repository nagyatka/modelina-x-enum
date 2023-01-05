import { CommonInputModel, CommonModel, OutputModel, Preset, Presets, RenderOutput, ProcessorOptions } from '../models';
import { IndentationTypes } from '../helpers';
export interface CommonGeneratorOptions<P extends Preset = Preset> {
    indentation?: {
        type: IndentationTypes;
        size: number;
    };
    defaultPreset?: P;
    presets?: Presets<P>;
    processorOptions?: ProcessorOptions;
}
export declare const defaultGeneratorOptions: CommonGeneratorOptions;
/**
 * Abstract generator which must be implemented by each language
 */
export declare abstract class AbstractGenerator<Options extends CommonGeneratorOptions = CommonGeneratorOptions, RenderCompleteModelOptions = any> {
    readonly languageName: string;
    protected options: Options;
    constructor(languageName: string, defaultOptions?: Options, passedOptions?: Options);
    abstract render(model: CommonModel, inputModel: CommonInputModel): Promise<RenderOutput>;
    abstract renderCompleteModel(model: CommonModel, inputModel: CommonInputModel, options: RenderCompleteModelOptions): Promise<RenderOutput>;
    process(input: Record<string, unknown>): Promise<CommonInputModel>;
    /**
     * Generates the full output of a model, instead of a scattered model.
     *
     * OutputModels result is no longer the model itself, but including package, package dependencies and model dependencies.
     *
     * @param input
     * @param options to use for rendering full output
     */
    generateCompleteModels(input: Record<string, unknown> | CommonInputModel, options: RenderCompleteModelOptions): Promise<OutputModel[]>;
    /**
     * Generates a scattered model where dependencies and rendered results are separated.
     *
     * @param input
     */
    generate(input: Record<string, unknown> | CommonInputModel): Promise<OutputModel[]>;
    /**
     * Process any of the input formats to the appropriate CommonInputModel type.
     *
     * @param input
     */
    private processInput;
    protected getPresets(presetType: string): Array<[Preset, unknown]>;
    protected mergeOptions(defaultOptions?: Options, passedOptions?: Options): Options;
}
//# sourceMappingURL=AbstractGenerator.d.ts.map