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
exports.JavaScriptGenerator = void 0;
const AbstractGenerator_1 = require("../AbstractGenerator");
const models_1 = require("../../models");
const helpers_1 = require("../../helpers");
const JavaScriptPreset_1 = require("./JavaScriptPreset");
const ClassRenderer_1 = require("./renderers/ClassRenderer");
const __1 = require("../../");
/**
 * Generator for JavaScript
 */
class JavaScriptGenerator extends AbstractGenerator_1.AbstractGenerator {
    constructor(options = JavaScriptGenerator.defaultOptions) {
        super('JavaScript', JavaScriptGenerator.defaultOptions, options);
    }
    /**
     * Render a complete model result where the model code, library and model dependencies are all bundled appropriately.
     *
     * @param model
     * @param inputModel
     * @param options
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    renderCompleteModel(model, inputModel, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const outputModel = yield this.render(model, inputModel);
            let modelDependencies = model.getNearestDependencies();
            //Ensure model dependencies have their rendered name
            modelDependencies = modelDependencies.map((dependencyModelName) => {
                var _a;
                return ((_a = this.options.namingConvention) === null || _a === void 0 ? void 0 : _a.type) ? this.options.namingConvention.type(dependencyModelName, { inputModel, model: inputModel.models[String(dependencyModelName)] }) : dependencyModelName;
            });
            //Filter out any dependencies that is recursive to it'self
            modelDependencies = modelDependencies.filter((dependencyModelName) => {
                return dependencyModelName !== outputModel.renderedName;
            });
            //Create the correct dependency imports
            modelDependencies = modelDependencies.map((formattedDependencyModelName) => {
                if (options.moduleSystem === 'CJS') {
                    return `const ${formattedDependencyModelName} = require('./${formattedDependencyModelName}');`;
                }
                return `import ${formattedDependencyModelName} from './${formattedDependencyModelName}';`;
            });
            let modelCode = `${outputModel.result}
export default ${outputModel.renderedName};
`;
            if (options.moduleSystem === 'CJS') {
                modelCode = `${outputModel.result}
module.exports = ${outputModel.renderedName};`;
            }
            const outputContent = `${[...modelDependencies, ...outputModel.dependencies].join('\n')}

${modelCode}`;
            return models_1.RenderOutput.toRenderOutput({ result: outputContent, renderedName: outputModel.renderedName, dependencies: outputModel.dependencies });
        });
    }
    render(model, inputModel) {
        const kind = helpers_1.TypeHelpers.extractKind(model);
        if (kind === helpers_1.ModelKind.OBJECT) {
            return this.renderClass(model, inputModel);
        }
        __1.Logger.warn(`JS generator, cannot generate model for '${model.$id}'`);
        return Promise.resolve(models_1.RenderOutput.toRenderOutput({ result: '', renderedName: '', dependencies: [] }));
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
exports.JavaScriptGenerator = JavaScriptGenerator;
JavaScriptGenerator.defaultOptions = Object.assign(Object.assign({}, AbstractGenerator_1.defaultGeneratorOptions), { defaultPreset: JavaScriptPreset_1.JS_DEFAULT_PRESET, namingConvention: helpers_1.CommonNamingConventionImplementation });
//# sourceMappingURL=JavaScriptGenerator.js.map