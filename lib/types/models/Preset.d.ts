import { AbstractRenderer } from '../generators/AbstractRenderer';
import { CommonInputModel } from './CommonInputModel';
import { CommonModel } from './CommonModel';
export interface PresetArgs<R extends AbstractRenderer, O extends object = any> {
    model: CommonModel;
    inputModel: CommonInputModel;
    renderer: R;
    options: O;
    content: string;
}
export interface CommonPreset<R extends AbstractRenderer, O extends object = any> {
    self?: (args: PresetArgs<R, O>) => Promise<string> | string;
    additionalContent?: (args: PresetArgs<R, O>) => Promise<string> | string;
}
export declare enum PropertyType {
    property = 0,
    additionalProperty = 1,
    patternProperties = 2
}
export interface PropertyArgs {
    propertyName: string;
    property: CommonModel;
    type: PropertyType;
}
export interface ClassPreset<R extends AbstractRenderer, O extends object = any> extends CommonPreset<R, O> {
    ctor?: (args: PresetArgs<R, O>) => Promise<string> | string;
    property?: (args: PresetArgs<R, O> & PropertyArgs) => Promise<string> | string;
    getter?: (args: PresetArgs<R, O> & PropertyArgs) => Promise<string> | string;
    setter?: (args: PresetArgs<R, O> & PropertyArgs) => Promise<string> | string;
}
export interface InterfacePreset<R extends AbstractRenderer, O extends object = any> extends CommonPreset<R, O> {
    property?: (args: PresetArgs<R, O> & PropertyArgs) => Promise<string> | string;
}
export interface EnumArgs {
    item: any;
}
export interface EnumPreset<R extends AbstractRenderer, O extends object = any> extends CommonPreset<R, O> {
    item?: (args: PresetArgs<R, O> & EnumArgs) => string;
}
export declare type Preset<C extends Record<string, CommonPreset<any, any>> = any> = Partial<C>;
export declare type PresetWithOptions<P extends Preset = Preset, O = any> = {
    preset: P;
    options: O;
};
export declare type Presets<P extends Preset = Preset> = Array<P | PresetWithOptions<P>>;
//# sourceMappingURL=Preset.d.ts.map