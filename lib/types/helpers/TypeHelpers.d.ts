import { CommonModel } from '../models';
export declare enum ModelKind {
    OBJECT = "object",
    ARRAY = "array",
    ENUM = "enum",
    CONST = "const",
    UNION = "union",
    PRIMITIVE = "primitive"
}
export declare class TypeHelpers {
    /**
     * Returns the type (object | array | union | enum | primitive) of the model
     * @param model to check
     * @returns {ModelKind}
     */
    static extractKind(model: CommonModel): ModelKind;
}
//# sourceMappingURL=TypeHelpers.d.ts.map