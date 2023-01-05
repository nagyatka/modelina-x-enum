import { AbstractRenderer } from '../AbstractRenderer';
import { CSharpGenerator, CSharpOptions } from './CSharpGenerator';
import { CommonModel, CommonInputModel, Preset, PropertyType } from '../../models';
/**
 * Common renderer for CSharp types
 *
 * @extends AbstractRenderer
 */
export declare abstract class CSharpRenderer extends AbstractRenderer<CSharpOptions> {
    constructor(options: CSharpOptions, generator: CSharpGenerator, presets: Array<[Preset, unknown]>, model: CommonModel, inputModel: CommonInputModel);
    /**
     * Renders the name of a type based on provided generator option naming convention type function.
     *
     * This is used to render names of models and then later used if that class is referenced from other models.
     *
     * @param name
     * @param model
     */
    nameType(name: string | undefined, model?: CommonModel): string;
    /**
     * Renders the name of a property based on provided generator option naming convention property function.
     *
     * @param propertyName
     * @param property
     */
    nameProperty(propertyName: string | undefined, property?: CommonModel): string;
    runPropertyPreset(propertyName: string, property: CommonModel, options: any, type?: PropertyType): Promise<string>;
    renderType(model: CommonModel, modelName?: string): string;
    renderComments(lines: string | string[]): string;
    toCSharpType(type: string | undefined, model: CommonModel, modelName?: string, isRequired?: boolean): string;
    private questionMark;
}
//# sourceMappingURL=CSharpRenderer.d.ts.map