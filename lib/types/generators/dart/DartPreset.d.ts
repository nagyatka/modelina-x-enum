import { Preset, ClassPreset, EnumPreset } from '../../models';
import { ClassRenderer } from './renderers/ClassRenderer';
import { EnumRenderer } from './renderers/EnumRenderer';
export declare type DartPreset = Preset<{
    class: ClassPreset<ClassRenderer>;
    enum: EnumPreset<EnumRenderer>;
}>;
export declare const DART_DEFAULT_PRESET: DartPreset;
//# sourceMappingURL=DartPreset.d.ts.map