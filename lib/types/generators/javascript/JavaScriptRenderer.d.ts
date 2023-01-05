import { AbstractRenderer } from '../AbstractRenderer';
import { JavaScriptGenerator, JavaScriptOptions } from './JavaScriptGenerator';
import { CommonModel, CommonInputModel, Preset, PropertyType } from '../../models';
/**
 * Common renderer for JavaScript types
 *
 * @extends AbstractRenderer
 */
export declare abstract class JavaScriptRenderer extends AbstractRenderer<JavaScriptOptions, JavaScriptGenerator> {
    constructor(options: JavaScriptOptions, generator: JavaScriptGenerator, presets: Array<[Preset, unknown]>, model: CommonModel, inputModel: CommonInputModel);
    /**
     * Renders the name of a type based on provided generator option naming convention type function.
     *
     * This is used to render names of models (example TS class) and then later used if that class is referenced from other models.
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
    renderComments(lines: string | string[]): string;
    renderProperties(): Promise<string>;
    runPropertyPreset(propertyName: string, property: CommonModel, type?: PropertyType): Promise<string>;
}
//# sourceMappingURL=JavaScriptRenderer.d.ts.map