import { AbstractGenerator, CommonGeneratorOptions } from './AbstractGenerator';
import { CommonModel, CommonInputModel, Preset } from '../models';
import { IndentationTypes } from '../helpers';
/**
 * Abstract renderer with common helper methods
 */
export declare abstract class AbstractRenderer<O extends CommonGeneratorOptions = CommonGeneratorOptions, G extends AbstractGenerator = AbstractGenerator> {
    protected readonly options: O;
    readonly generator: G;
    protected readonly presets: Array<[Preset, unknown]>;
    protected readonly model: CommonModel;
    protected readonly inputModel: CommonInputModel;
    dependencies: string[];
    constructor(options: O, generator: G, presets: Array<[Preset, unknown]>, model: CommonModel, inputModel: CommonInputModel, dependencies?: string[]);
    /**
     * Adds a dependency while ensuring that only one dependency is preset at a time.
     *
     * @param dependency complete dependency string so it can be rendered as is.
     */
    addDependency(dependency: string): void;
    renderLine(line: string): string;
    renderBlock(lines: string[], newLines?: number): string;
    indent(content: string, size?: number, type?: IndentationTypes): string;
    runSelfPreset(): Promise<string>;
    runAdditionalContentPreset(): Promise<string>;
    runPreset(functionName: string, params?: Record<string, unknown>): Promise<string>;
}
//# sourceMappingURL=AbstractRenderer.d.ts.map