import { GoRenderer } from '../GoRenderer';
import { StructPreset } from '../GoPreset';
/**
 * Renderer for Go's `struct` type
 *
 * @extends GoRenderer
 */
export declare class StructRenderer extends GoRenderer {
    defaultSelf(): Promise<string>;
}
export declare const GO_DEFAULT_STRUCT_PRESET: StructPreset<StructRenderer>;
//# sourceMappingURL=StructRenderer.d.ts.map