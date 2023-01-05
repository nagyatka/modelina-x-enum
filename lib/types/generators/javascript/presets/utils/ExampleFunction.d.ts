import { JavaScriptRenderer } from '../../JavaScriptRenderer';
import { CommonModel } from '../../../../models';
export declare function renderValueFromModel(model: CommonModel, renderer: JavaScriptRenderer): string | undefined;
export declare function renderValueFromType(modelType: string | undefined, model: CommonModel, renderer: JavaScriptRenderer): string | undefined;
export default function renderExampleFunction({ renderer, model }: {
    renderer: JavaScriptRenderer;
    model: CommonModel;
}): string;
//# sourceMappingURL=ExampleFunction.d.ts.map