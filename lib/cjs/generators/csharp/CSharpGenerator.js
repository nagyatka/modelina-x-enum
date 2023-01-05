"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSharpGenerator = void 0;
const AbstractGenerator_1 = require("../AbstractGenerator");
const models_1 = require("../../models");
const helpers_1 = require("../../helpers");
const CSharpPreset_1 = require("./CSharpPreset");
const EnumRenderer_1 = require("./renderers/EnumRenderer");
const ClassRenderer_1 = require("./renderers/ClassRenderer");
const Constants_1 = require("./Constants");
const index_1 = require("../../index");
/**
 * Generator for CSharp
 */
class CSharpGenerator extends AbstractGenerator_1.AbstractGenerator {
    constructor(options = CSharpGenerator.defaultOptions) {
        super('CSharp', CSharpGenerator.defaultOptions, options);
    }
    /**
     * Render a complete model result where the model code, library and model dependencies are all bundled appropriately.
     *
     * For CSharp we need to specify which namespace the model is placed under.
     *
     * @param model
     * @param inputModel
     * @param options used to render the full output
     */
    renderCompleteModel(model, inputModel, options) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, Constants_1.isReservedCSharpKeyword)(options.namespace)) {
                throw new Error(`You cannot use reserved CSharp keyword (${options.namespace}) as namespace, please use another.`);
            }
            const outputModel = yield this.render(model, inputModel);
            const outputDependencies = outputModel.dependencies.length === 0 ? '' : `${outputModel.dependencies.join('\n')}\n\n`;
            const outputContent = `namespace ${options.namespace}
{
${helpers_1.FormatHelpers.indent(outputDependencies + outputModel.result, (_a = this.options.indentation) === null || _a === void 0 ? void 0 : _a.size, (_b = this.options.indentation) === null || _b === void 0 ? void 0 : _b.type)}
}`;
            return models_1.RenderOutput.toRenderOutput({ result: outputContent, renderedName: outputModel.renderedName, dependencies: outputModel.dependencies });
        });
    }
    render(model, inputModel) {
        var _a;
        const kind = helpers_1.TypeHelpers.extractKind(model);
        switch (kind) {
            case helpers_1.ModelKind.UNION:
                //We dont support union in Csharp generator, however, if union is an object, we render it as a class.
                if (!((_a = model.type) === null || _a === void 0 ? void 0 : _a.includes('object'))) {
                    break;
                }
                return this.renderClass(model, inputModel);
            case helpers_1.ModelKind.OBJECT:
                return this.renderClass(model, inputModel);
            case helpers_1.ModelKind.ENUM:
                return this.renderEnum(model, inputModel);
        }
        index_1.Logger.warn(`C# generator, cannot generate this type of model, ${model.$id}`);
        return Promise.resolve(models_1.RenderOutput.toRenderOutput({ result: '', renderedName: '', dependencies: [] }));
    }
    renderEnum(model, inputModel) {
        return __awaiter(this, void 0, void 0, function* () {
            const presets = this.getPresets('enum');
            const renderer = new EnumRenderer_1.EnumRenderer(this.options, this, presets, model, inputModel);
            const result = yield renderer.runSelfPreset();
            const renderedName = renderer.nameType(model.$id, model);
            return models_1.RenderOutput.toRenderOutput({ result, renderedName, dependencies: renderer.dependencies });
        });
    }
    renderClass(model, inputModel) {
        return __awaiter(this, void 0, void 0, function* () {
            const presets = this.getPresets('class');
            const renderer = new ClassRenderer_1.ClassRenderer(this.options, this, presets, model, inputModel);
            const result = yield renderer.runSelfPreset();
            const renderedName = renderer.nameType(model.$id, model);
            return models_1.RenderOutput.toRenderOutput({ result, renderedName, dependencies: renderer.dependencies });
        });
    }
}
exports.CSharpGenerator = CSharpGenerator;
CSharpGenerator.defaultOptions = Object.assign(Object.assign({}, AbstractGenerator_1.defaultGeneratorOptions), { collectionType: 'Array', defaultPreset: CSharpPreset_1.CSHARP_DEFAULT_PRESET, namingConvention: helpers_1.CommonNamingConventionImplementation });
//# sourceMappingURL=CSharpGenerator.js.map