import { Preset, EnumPreset, ClassPreset, PresetArgs, PropertyArgs } from '../../models';
import { ClassRenderer } from './renderers/ClassRenderer';
import { EnumRenderer } from './renderers/EnumRenderer';
export interface CsharpClassPreset extends ClassPreset<ClassRenderer> {
    accessor?: (args: PresetArgs<ClassRenderer, any> & PropertyArgs) => Promise<string> | string;
}
export declare type CSharpPreset<O extends object = any> = Preset<{
    class: CsharpClassPreset;
    enum: EnumPreset<EnumRenderer, O>;
}>;
export declare const CSHARP_DEFAULT_PRESET: CSharpPreset;
//# sourceMappingURL=CSharpPreset.d.ts.map