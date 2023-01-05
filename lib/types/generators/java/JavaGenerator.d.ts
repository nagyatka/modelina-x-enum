import { AbstractGenerator, CommonGeneratorOptions } from '../AbstractGenerator';
import { CommonModel, CommonInputModel, RenderOutput } from '../../models';
import { CommonNamingConvention } from '../../helpers';
import { JavaPreset } from './JavaPreset';
export interface JavaOptions extends CommonGeneratorOptions<JavaPreset> {
    collectionType?: 'List' | 'Array';
    namingConvention?: CommonNamingConvention;
}
export interface JavaRenderCompleteModelOptions {
    packageName: string;
}
export declare class JavaGenerator extends AbstractGenerator<JavaOptions, JavaRenderCompleteModelOptions> {
    static defaultOptions: JavaOptions;
    constructor(options?: JavaOptions);
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
     * For Java you need to specify which package the model is placed under.
     *
     * @param model
     * @param inputModel
     * @param options used to render the full output
     */
    renderCompleteModel(model: CommonModel, inputModel: CommonInputModel, options: JavaRenderCompleteModelOptions): Promise<RenderOutput>;
    renderClass(model: CommonModel, inputModel: CommonInputModel): Promise<RenderOutput>;
    renderEnum(model: CommonModel, inputModel: CommonInputModel): Promise<RenderOutput>;
}
//# sourceMappingURL=JavaGenerator.d.ts.map