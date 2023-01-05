import { JavaRenderer } from '../JavaRenderer';
import { JavaEnumPreset } from '../JavaPreset';
/**
 * Renderer for Java's `enum` type
 *
 * @extends JavaRenderer
 */
export declare class EnumRenderer extends JavaRenderer {
    defaultSelf(): Promise<string>;
    renderItems(): Promise<string>;
    normalizeKey(value: any): string;
    normalizeValue(value: any): string;
    runItemPreset(item: any): Promise<string>;
    runCtorPreset(): Promise<string>;
    runGetValuePreset(): Promise<string>;
    runFromValuePreset(): Promise<string>;
}
export declare const JAVA_DEFAULT_ENUM_PRESET: JavaEnumPreset;
//# sourceMappingURL=EnumRenderer.d.ts.map