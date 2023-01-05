import { AbstractRenderer } from '../AbstractRenderer';
import { Preset, CommonModel, CommonPreset, PresetArgs, EnumPreset } from '../../models';
import { StructRenderer } from './renderers/StructRenderer';
import { EnumRenderer } from './renderers/EnumRenderer';
export declare enum FieldType {
    field = 0,
    additionalProperty = 1,
    patternProperties = 2
}
export interface FieldArgs {
    fieldName: string;
    field: CommonModel;
    type: FieldType;
}
export interface StructPreset<R extends AbstractRenderer, O extends object = any> extends CommonPreset<R, O> {
    field?: (args: PresetArgs<R, O> & FieldArgs) => Promise<string> | string;
}
export declare type GoPreset<O extends object = any> = Preset<{
    struct: StructPreset<StructRenderer, O>;
    enum: EnumPreset<EnumRenderer, O>;
}>;
export declare const GO_DEFAULT_PRESET: GoPreset;
//# sourceMappingURL=GoPreset.d.ts.map