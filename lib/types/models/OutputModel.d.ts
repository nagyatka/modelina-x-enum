import { CommonInputModel } from './CommonInputModel';
import { CommonModel } from './CommonModel';
export interface ToOutputModelArg {
    result: string;
    model: CommonModel;
    modelName: string;
    inputModel: CommonInputModel;
    dependencies: string[];
}
/**
 * Common representation for the output model.
 */
export declare class OutputModel {
    readonly result: string;
    readonly model: CommonModel;
    readonly modelName: string;
    readonly inputModel: CommonInputModel;
    readonly dependencies: string[];
    constructor(result: string, model: CommonModel, modelName: string, inputModel: CommonInputModel, dependencies: string[]);
    static toOutputModel(args: ToOutputModelArg): OutputModel;
    static toOutputModel(args: Array<ToOutputModelArg>): Array<OutputModel>;
}
//# sourceMappingURL=OutputModel.d.ts.map