import { ProcessorOptions, CommonInputModel } from '../models';
export declare abstract class AbstractInputProcessor {
    static MODELGEN_INFFERED_NAME: string;
    abstract process(input: Record<string, any>, options?: ProcessorOptions): Promise<CommonInputModel>;
    abstract shouldProcess(input: Record<string, any>): boolean;
}
//# sourceMappingURL=AbstractInputProcessor.d.ts.map