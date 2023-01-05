import { DartRenderer } from '../DartRenderer';
import { CommonModel, ClassPreset, PropertyType } from '../../../models';
/**
 * Renderer for Dart's `class` type
 *
 * @extends DartRenderer
 */
export declare class ClassRenderer extends DartRenderer {
    defaultSelf(): Promise<string>;
    runCtorPreset(): Promise<string>;
    /**
     * Render all the properties for the class.
     */
    renderProperties(): Promise<string>;
    runPropertyPreset(propertyName: string, property: CommonModel, type?: PropertyType): Promise<string>;
    /**
     * Render all the accessors for the properties
     */
    renderAccessors(): Promise<string>;
}
export declare const DART_DEFAULT_CLASS_PRESET: ClassPreset<ClassRenderer>;
//# sourceMappingURL=ClassRenderer.d.ts.map