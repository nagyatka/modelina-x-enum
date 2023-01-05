import { JavaScriptRenderer } from '../JavaScriptRenderer';
import { CommonModel, ClassPreset, PropertyType } from '../../../models';
/**
 * Renderer for JavaScript's `class` type
 *
 * @extends JavaScriptRenderer
 */
export declare class ClassRenderer extends JavaScriptRenderer {
    defaultSelf(): Promise<string>;
    runCtorPreset(): Promise<string>;
    renderAccessors(): Promise<string>;
    runGetterPreset(propertyName: string, property: CommonModel, type?: PropertyType): Promise<string>;
    runSetterPreset(propertyName: string, property: CommonModel, type?: PropertyType): Promise<string>;
}
export declare const JS_DEFAULT_CLASS_PRESET: ClassPreset<ClassRenderer>;
//# sourceMappingURL=ClassRenderer.d.ts.map