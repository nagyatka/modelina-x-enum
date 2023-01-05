import { TypeScriptRenderer } from '../TypeScriptRenderer';
import { EnumPreset } from '../../../models';
/**
 * Renderer for TypeScript's `enum` type
 *
 * @extends TypeScriptRenderer
 */
export declare class EnumRenderer extends TypeScriptRenderer {
    defaultSelf(): Promise<string>;
    renderItems(): Promise<string>;
    runItemPreset(item: any): Promise<string>;
    normalizeKey(value: any): any;
    normalizeValue(value: any): any;
}
export declare const TS_DEFAULT_ENUM_PRESET: EnumPreset<EnumRenderer>;
//# sourceMappingURL=EnumRenderer.d.ts.map