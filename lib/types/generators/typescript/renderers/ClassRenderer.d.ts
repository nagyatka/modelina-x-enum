import { TypeScriptRenderer } from '../TypeScriptRenderer';
import { CommonModel, ClassPreset, PropertyType } from '../../../models';
/**
 * Renderer for TypeScript's `class` type
 *
 * @extends TypeScriptRenderer
 */
export declare class ClassRenderer extends TypeScriptRenderer {
    defaultSelf(): Promise<string>;
    runCtorPreset(): Promise<string>;
    renderAccessors(): Promise<string>;
    runGetterPreset(propertyName: string, property: CommonModel, type?: PropertyType): Promise<string>;
    runSetterPreset(propertyName: string, property: CommonModel, type?: PropertyType): Promise<string>;
}
export declare const TS_DEFAULT_CLASS_PRESET: ClassPreset<ClassRenderer>;
//# sourceMappingURL=ClassRenderer.d.ts.map