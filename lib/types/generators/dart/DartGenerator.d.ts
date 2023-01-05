import { AbstractGenerator, CommonGeneratorOptions } from '../AbstractGenerator';
import { CommonModel, CommonInputModel, RenderOutput } from '../../models';
import { CommonNamingConvention } from '../../helpers';
import { DartPreset } from './DartPreset';
export interface DartOptions extends CommonGeneratorOptions<DartPreset> {
    collectionType?: 'List';
    namingConvention?: CommonNamingConvention;
}
export interface DartRenderCompleteModelOptions {
    packageName: string;
}
export declare class DartGenerator extends AbstractGenerator<DartOptions, DartRenderCompleteModelOptions> {
    static defaultOptions: DartOptions;
    constructor(options?: DartOptions);
    /**
     * Render a scattered model, where the source code and library and model dependencies are separated.
     *
     * @param model
     * @param inputModel
     */
    render(model: CommonModel, inputModel: CommonInputModel): Promise<RenderOutput>;
    /**
     * Render a complete model result where the model code, library and model dependencies are all bundled appropriately.
     *
     * For Dart you need to specify which package the model is placed under.
     *
     * @param model
     * @param inputModel
     * @param options used to render the full output
     */
    renderCompleteModel(model: CommonModel, inputModel: CommonInputModel, options: DartRenderCompleteModelOptions): Promise<RenderOutput>;
    renderClass(model: CommonModel, inputModel: CommonInputModel): Promise<RenderOutput>;
    renderEnum(model: CommonModel, inputModel: CommonInputModel): Promise<RenderOutput>;
}
//# sourceMappingURL=DartGenerator.d.ts.map