import { CSharpRenderer } from '../CSharpRenderer';
import { CommonModel, PropertyType } from '../../../models';
import { CsharpClassPreset } from '../CSharpPreset';
/**
 * Renderer for CSharp's `struct` type
 *
 * @extends CSharpRenderer
 */
export declare class ClassRenderer extends CSharpRenderer {
    defaultSelf(): Promise<string>;
    renderProperties(): Promise<string>;
    renderAccessors(): Promise<string>;
    runCtorPreset(): Promise<string>;
    runAccessorPreset(propertyName: string, property: CommonModel, options?: any, type?: PropertyType): Promise<string>;
    runPropertyPreset(propertyName: string, property: CommonModel, options?: any, type?: PropertyType): Promise<string>;
    runGetterPreset(propertyName: string, property: CommonModel, options?: any, type?: PropertyType): Promise<string>;
    runSetterPreset(propertyName: string, property: CommonModel, options?: any, type?: PropertyType): Promise<string>;
}
export declare const CSHARP_DEFAULT_CLASS_PRESET: CsharpClassPreset;
//# sourceMappingURL=ClassRenderer.d.ts.map