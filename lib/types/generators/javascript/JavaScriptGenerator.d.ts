import { AbstractGenerator, CommonGeneratorOptions } from '../AbstractGenerator';
import { CommonModel, CommonInputModel, RenderOutput } from '../../models';
import { CommonNamingConvention } from '../../helpers';
import { JavaScriptPreset } from './JavaScriptPreset';
export interface JavaScriptOptions extends CommonGeneratorOptions<JavaScriptPreset> {
    namingConvention?: CommonNamingConvention;
}
export interface JavaScriptRenderCompleteModelOptions {
    moduleSystem?: 'ESM' | 'CJS';
}
/**
 * Generator for JavaScript
 */
export declare class JavaScriptGenerator extends AbstractGenerator<JavaScriptOptions, JavaScriptRenderCompleteModelOptions> {
    static defaultOptions: JavaScriptOptions;
    constructor(options?: JavaScriptOptions);
    /**
     * Render a complete model result where the model code, library and model dependencies are all bundled appropriately.
     *
     * @param model
     * @param inputModel
     * @param options
     */
    renderCompleteModel(model: CommonModel, inputModel: CommonInputModel, options: JavaScriptRenderCompleteModelOptions): Promise<RenderOutput>;
    render(model: CommonModel, inputModel: CommonInputModel): Promise<RenderOutput>;
    renderClass(model: CommonModel, inputModel: CommonInputModel): Promise<RenderOutput>;
}
//# sourceMappingURL=JavaScriptGenerator.d.ts.map