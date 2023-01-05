import { GoRenderer } from '../GoRenderer';
import { EnumPreset, CommonModel } from '../../../models';
/**
 * Renderer for Go's `enum` type
 *
 * @extends GoRenderer
 */
export declare class EnumRenderer extends GoRenderer {
    defaultSelf(): string;
    enumType(model: CommonModel): string;
    renderCommentForEnumType(name: string, type: string): string;
    renderConstValuesForEnumType(typeName: string, innerType: string, values: string[]): string[];
}
export declare const GO_DEFAULT_ENUM_PRESET: EnumPreset<EnumRenderer>;
//# sourceMappingURL=EnumRenderer.d.ts.map