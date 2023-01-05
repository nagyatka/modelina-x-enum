import { Preset, ClassPreset } from '../../models';
import { ClassRenderer } from './renderers/ClassRenderer';
export declare type JavaScriptPreset<O extends object = any> = Preset<{
    class: ClassPreset<ClassRenderer, O>;
}>;
export declare const JS_DEFAULT_PRESET: JavaScriptPreset;
//# sourceMappingURL=JavaScriptPreset.d.ts.map