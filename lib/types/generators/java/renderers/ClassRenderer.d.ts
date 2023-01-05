import { JavaRenderer } from '../JavaRenderer';
import { CommonModel, ClassPreset, PropertyType } from '../../../models';
/**
 * Renderer for Java's `class` type
 *
 * @extends JavaRenderer
 */
export declare class ClassRenderer extends JavaRenderer {
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
    runGetterPreset(propertyName: string, property: CommonModel, type?: PropertyType): Promise<string>;
    runSetterPreset(propertyName: string, property: CommonModel, type?: PropertyType): Promise<string>;
}
export declare const JAVA_DEFAULT_CLASS_PRESET: ClassPreset<ClassRenderer>;
//# sourceMappingURL=ClassRenderer.d.ts.map