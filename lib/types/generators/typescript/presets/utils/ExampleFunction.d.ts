import { TypeScriptRenderer } from '../../TypeScriptRenderer';
import { CommonModel } from '../../../../models';
/**
 * Inferring first acceptable value from the model.
 *
 * @param model
 * @param renderer
 */
export declare function renderValueFromModel(model: CommonModel, renderer: TypeScriptRenderer): string | undefined;
export declare function renderValueFromType(modelType: string | undefined, model: CommonModel, renderer: TypeScriptRenderer): string | undefined;
/**
 * Render `example` function based on model properties.
 */
export default function renderExampleFunction({ renderer, model }: {
    renderer: TypeScriptRenderer;
    model: CommonModel;
}): string;
//# sourceMappingURL=ExampleFunction.d.ts.map