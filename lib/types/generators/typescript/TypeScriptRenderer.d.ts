import { AbstractRenderer } from '../AbstractRenderer';
import { TypeScriptGenerator, TypeScriptOptions } from './TypeScriptGenerator';
import { CommonModel, CommonInputModel, Preset, PropertyType } from '../../models';
/**
 * Common renderer for TypeScript types
 *
 * @extends AbstractRenderer
 */
export declare abstract class TypeScriptRenderer extends AbstractRenderer<TypeScriptOptions, TypeScriptGenerator> {
    constructor(options: TypeScriptOptions, generator: TypeScriptGenerator, presets: Array<[Preset, unknown]>, model: CommonModel, inputModel: CommonInputModel);
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
    renderType(model: CommonModel | CommonModel[]): string;
    /**
     * JSON Schema types to TS
     *
     * @param type
     * @param model
     */
    toTsType(type: string | undefined, model: CommonModel): string;
    renderTypeSignature(type: CommonModel | CommonModel[], { isRequired, orUndefined, }?: {
        isRequired?: boolean;
        orUndefined?: boolean;
    }): string;
    renderComments(lines: string | string[]): string;
    /**
     * Render all the properties for the model by calling the property preset per property.
     */
    renderProperties(): Promise<string>;
    renderProperty(propertyName: string, property: CommonModel, type?: PropertyType): string;
    runPropertyPreset(propertyName: string, property: CommonModel, type?: PropertyType): Promise<string>;
}
//# sourceMappingURL=TypeScriptRenderer.d.ts.map