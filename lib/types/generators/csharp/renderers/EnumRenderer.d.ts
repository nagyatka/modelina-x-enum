import { CSharpRenderer } from '../CSharpRenderer';
import { EnumPreset } from '../../../models';
/**
 * Renderer for C#'s `enum` type
 *
 * @extends CSharpRenderer
 */
export declare class EnumRenderer extends CSharpRenderer {
    defaultSelf(): Promise<string>;
    renderItems(): Promise<string>;
    /**
     * Some enum values require custom value conversion
     */
    getEnumValue(enumValue: any): any;
    toEnumCaseItemValues(): Promise<string>;
    getValueCaseItemValues(): Promise<string>;
    runItemPreset(item: any): Promise<string>;
}
export declare const CSHARP_DEFAULT_ENUM_PRESET: EnumPreset<EnumRenderer>;
//# sourceMappingURL=EnumRenderer.d.ts.map