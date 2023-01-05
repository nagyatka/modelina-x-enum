import { AbstractGenerator, CommonGeneratorOptions } from '../AbstractGenerator';
import { CommonModel, CommonInputModel, RenderOutput } from '../../models';
import { CommonNamingConvention } from '../../helpers';
import { CSharpPreset } from './CSharpPreset';
export interface CSharpOptions extends CommonGeneratorOptions<CSharpPreset> {
    collectionType?: 'List' | 'Array';
    namingConvention?: CommonNamingConvention;
}
export interface CSharpRenderCompleteModelOptions {
    namespace: string;
}
/**
 * Generator for CSharp
 */
export declare class CSharpGenerator extends AbstractGenerator<CSharpOptions, CSharpRenderCompleteModelOptions> {
    static defaultOptions: CSharpOptions;
    constructor(options?: CSharpOptions);
    /**
     * Render a complete model result where the model code, library and model dependencies are all bundled appropriately.
     *
     * For CSharp we need to specify which namespace the model is placed under.
     *
     * @param model
     * @param inputModel
     * @param options used to render the full output
     */
    renderCompleteModel(model: CommonModel, inputModel: CommonInputModel, options: CSharpRenderCompleteModelOptions): Promise<RenderOutput>;
    render(model: CommonModel, inputModel: CommonInputModel): Promise<RenderOutput>;
    renderEnum(model: CommonModel, inputModel: CommonInputModel): Promise<RenderOutput>;
    renderClass(model: CommonModel, inputModel: CommonInputModel): Promise<RenderOutput>;
}
//# sourceMappingURL=CSharpGenerator.d.ts.map