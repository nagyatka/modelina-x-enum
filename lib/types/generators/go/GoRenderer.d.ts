import { AbstractRenderer } from '../AbstractRenderer';
import { GoGenerator, GoOptions } from './GoGenerator';
import { CommonModel, CommonInputModel, Preset } from '../../models';
import { FieldType } from './GoPreset';
/**
 * Common renderer for Go types
 *
 * @extends AbstractRenderer
 */
export declare abstract class GoRenderer extends AbstractRenderer<GoOptions> {
    constructor(options: GoOptions, generator: GoGenerator, presets: Array<[Preset, unknown]>, model: CommonModel, inputModel: CommonInputModel);
    renderFields(): Promise<string>;
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
     * Renders the name of a field based on provided generator option naming convention field function.
     *
     * @param fieldName
     * @param field
     */
    nameField(fieldName: string | undefined, field?: CommonModel): string;
    runFieldPreset(fieldName: string, field: CommonModel, type?: FieldType): Promise<string>;
    renderType(model: CommonModel): string;
    renderComments(lines: string | string[]): string;
    toGoType(type: string | undefined, model: CommonModel): string;
}
//# sourceMappingURL=GoRenderer.d.ts.map