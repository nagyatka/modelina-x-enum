import { AbstractRenderer } from '../AbstractRenderer';
import { JavaGenerator, JavaOptions } from './JavaGenerator';
import { CommonModel, CommonInputModel, Preset } from '../../models';
/**
 * Common renderer for Java types
 *
 * @extends AbstractRenderer
 */
export declare abstract class JavaRenderer extends AbstractRenderer<JavaOptions, JavaGenerator> {
    constructor(options: JavaOptions, generator: JavaGenerator, presets: Array<[Preset, unknown]>, model: CommonModel, inputModel: CommonInputModel);
    /**
     * Renders the name of a type based on provided generator option naming convention type function.
     *
     * This is used to render names of models and then later used if it is referenced from other models.
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
    /**
     * Renders model(s) to Java type(s).
     *
     * @param model
     */
    renderType(model: CommonModel | CommonModel[]): string;
    toJavaTypeWithFormat(type: string | undefined, format: string | undefined, model: CommonModel): string;
    /**
     * Returns the Java corresponding type from CommonModel type or JSON schema format
     * @param type
     * @param model
     */
    toJavaType(type: string | undefined, model: CommonModel): string;
    toClassType(type: string): string;
    renderComments(lines: string | string[]): string;
    renderAnnotation(annotationName: string, value?: any | Record<string, any>): string;
}
//# sourceMappingURL=JavaRenderer.d.ts.map