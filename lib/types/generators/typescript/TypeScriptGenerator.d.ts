import { AbstractGenerator, CommonGeneratorOptions } from '../AbstractGenerator';
import { CommonModel, CommonInputModel, RenderOutput } from '../../models';
import { CommonNamingConvention } from '../../helpers';
import { TypeScriptPreset } from './TypeScriptPreset';
export interface TypeScriptOptions extends CommonGeneratorOptions<TypeScriptPreset> {
    renderTypes?: boolean;
    modelType?: 'class' | 'interface';
    enumType?: 'enum' | 'union';
    namingConvention?: CommonNamingConvention;
}
export interface TypeScriptRenderCompleteModelOptions {
    moduleSystem?: 'ESM' | 'CJS';
    exportType?: 'default' | 'named';
}
/**
 * Generator for TypeScript
 */
export declare class TypeScriptGenerator extends AbstractGenerator<TypeScriptOptions, TypeScriptRenderCompleteModelOptions> {
    static defaultOptions: TypeScriptOptions;
    constructor(options?: TypeScriptOptions);
    /**
     * Render a complete model result where the model code, library and model dependencies are all bundled appropriately.
     *
     * @param model
     * @param inputModel
     * @param options
     */
    renderCompleteModel(model: CommonModel, inputModel: CommonInputModel, { moduleSystem, exportType }: TypeScriptRenderCompleteModelOptions): Promise<RenderOutput>;
    render(model: CommonModel, inputModel: CommonInputModel): Promise<RenderOutput>;
    renderClass(model: CommonModel, inputModel: CommonInputModel): Promise<RenderOutput>;
    renderInterface(model: CommonModel, inputModel: CommonInputModel): Promise<RenderOutput>;
    renderEnum(model: CommonModel, inputModel: CommonInputModel): Promise<RenderOutput>;
    renderType(model: CommonModel, inputModel: CommonInputModel): Promise<RenderOutput>;
    private renderModelType;
}
//# sourceMappingURL=TypeScriptGenerator.d.ts.map