import { Preset, ClassPreset, EnumPreset, PresetArgs, EnumArgs } from '../../models';
import { ClassRenderer } from './renderers/ClassRenderer';
import { EnumRenderer } from './renderers/EnumRenderer';
export interface JavaEnumPreset<O extends object = any> extends EnumPreset<EnumRenderer, O> {
    ctor?: (args: PresetArgs<EnumRenderer, O> & EnumArgs) => string;
    getValue?: (args: PresetArgs<EnumRenderer, O> & EnumArgs) => string;
    fromValue?: (args: PresetArgs<EnumRenderer, O> & EnumArgs) => string;
}
export declare type JavaPreset<O extends object = any> = Preset<{
    class: ClassPreset<ClassRenderer, O>;
    enum: JavaEnumPreset<O>;
}>;
export declare const JAVA_DEFAULT_PRESET: JavaPreset;
//# sourceMappingURL=JavaPreset.d.ts.map