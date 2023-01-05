import { Preset, ClassPreset, InterfacePreset, EnumPreset, CommonPreset } from '../../models';
import { ClassRenderer } from './renderers/ClassRenderer';
import { InterfaceRenderer } from './renderers/InterfaceRenderer';
import { EnumRenderer } from './renderers/EnumRenderer';
import { TypeRenderer } from './renderers/TypeRenderer';
export declare type TypePreset<R extends TypeRenderer = TypeRenderer, O extends object = any> = CommonPreset<R, O>;
export declare type TypeScriptPreset<O extends object = any> = Preset<{
    class: ClassPreset<ClassRenderer, O>;
    interface: InterfacePreset<InterfaceRenderer, O>;
    enum: EnumPreset<EnumRenderer, O>;
    type: TypePreset<TypeRenderer, O>;
}>;
export declare const TS_DEFAULT_PRESET: TypeScriptPreset;
//# sourceMappingURL=TypeScriptPreset.d.ts.map