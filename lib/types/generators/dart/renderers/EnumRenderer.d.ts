import { DartRenderer } from '../DartRenderer';
import { EnumPreset } from '../../../models';
/**
 * Renderer for Dart's `enum` type
 *
 * @extends DartRenderer
 */
export declare class EnumRenderer extends DartRenderer {
    defaultSelf(): Promise<string>;
    renderItems(): Promise<string>;
    normalizeKey(value: any): string;
    normalizeValue(value: any): string;
    runItemPreset(item: any): Promise<string>;
}
export declare const DART_DEFAULT_ENUM_PRESET: EnumPreset<EnumRenderer>;
//# sourceMappingURL=EnumRenderer.d.ts.map