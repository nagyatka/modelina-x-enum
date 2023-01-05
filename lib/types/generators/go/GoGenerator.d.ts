import { AbstractGenerator, CommonGeneratorOptions } from '../AbstractGenerator';
import { CommonModel, CommonInputModel, RenderOutput } from '../../models';
import { GoPreset } from './GoPreset';
/**
 * The Go naming convention type
 */
export declare type GoNamingConvention = {
    type?: (name: string | undefined, ctx: {
        model: CommonModel;
        inputModel: CommonInputModel;
        reservedKeywordCallback?: (name: string) => boolean;
    }) => string;
    field?: (name: string | undefined, ctx: {
        model: CommonModel;
        inputModel: CommonInputModel;
        field?: CommonModel;
        reservedKeywordCallback?: (name: string) => boolean;
    }) => string;
};
/**
 * A GoNamingConvention implementation for Go
 */
export declare const GoNamingConventionImplementation: GoNamingConvention;
export interface GoOptions extends CommonGeneratorOptions<GoPreset> {
    namingConvention?: GoNamingConvention;
}
export interface GoRenderCompleteModelOptions {
    packageName: string;
}
/**
 * Generator for Go
 */
export declare class GoGenerator extends AbstractGenerator<GoOptions, GoRenderCompleteModelOptions> {
    static defaultOptions: GoOptions;
    constructor(options?: GoOptions);
    reservedGoKeyword(name: string): boolean;
    render(model: CommonModel, inputModel: CommonInputModel): Promise<RenderOutput>;
    /**
     * Render a complete model result where the model code, library and model dependencies are all bundled appropriately.
     *
     * @param model
     * @param inputModel
     * @param options
     */
    renderCompleteModel(model: CommonModel, inputModel: CommonInputModel, options: GoRenderCompleteModelOptions): Promise<RenderOutput>;
    renderEnum(model: CommonModel, inputModel: CommonInputModel): Promise<RenderOutput>;
    renderStruct(model: CommonModel, inputModel: CommonInputModel): Promise<RenderOutput>;
}
//# sourceMappingURL=GoGenerator.d.ts.map