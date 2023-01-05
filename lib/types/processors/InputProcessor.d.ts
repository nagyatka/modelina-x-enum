import { AbstractInputProcessor } from './AbstractInputProcessor';
import { ProcessorOptions, CommonInputModel } from '../models';
/**
 * Main input processor which figures out the type of input it receives and delegates the processing into separate individual processors.
 */
export declare class InputProcessor {
    static processor: InputProcessor;
    private processors;
    constructor();
    /**
     * Set a processor.
     *
     * @param type of processor
     * @param processor
     */
    setProcessor(type: string, processor: AbstractInputProcessor): void;
    /**
     *
     * @returns all processors
     */
    getProcessors(): Map<string, AbstractInputProcessor>;
    /**
     * The processor code which delegates the processing to the correct implementation.
     *
     * @param input to process
     * @param options passed to the processors
     */
    process(input: Record<string, any>, options?: ProcessorOptions): Promise<CommonInputModel>;
}
//# sourceMappingURL=InputProcessor.d.ts.map