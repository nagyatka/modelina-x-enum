import { TypeScriptRenderer } from '../TypeScriptRenderer';
import { TypePreset } from '../TypeScriptPreset';
/**
 * Renderer for TypeScript's `type` type
 *
 * @extends TypeScriptRenderer
 */
export declare class TypeRenderer extends TypeScriptRenderer {
    defaultSelf(): Promise<string>;
    renderTypeBody(): Promise<string>;
    renderEnum(): string;
}
export declare const TS_DEFAULT_TYPE_PRESET: TypePreset<TypeRenderer>;
//# sourceMappingURL=TypeRenderer.d.ts.map