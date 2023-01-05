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
exports.JavaGenerator = void 0;
const AbstractGenerator_1 = require("../AbstractGenerator");
const models_1 = require("../../models");
const helpers_1 = require("../../helpers");
const JavaPreset_1 = require("./JavaPreset");
const ClassRenderer_1 = require("./renderers/ClassRenderer");
const EnumRenderer_1 = require("./renderers/EnumRenderer");
const Constants_1 = require("./Constants");
const __1 = require("../../");
class JavaGenerator extends AbstractGenerator_1.AbstractGenerator {
    constructor(options = JavaGenerator.defaultOptions) {
        super('Java', JavaGenerator.defaultOptions, options);
    }
    /**
     * Render a scattered model, where the source code and library and model dependencies are separated.
     *
     * @param model
     * @param inputModel
     */
    render(model, inputModel) {
        var _a;
        const kind = helpers_1.TypeHelpers.extractKind(model);
        // We don't support union in Java generator, however, if union is an object, we render it as a class.
        if (kind === helpers_1.ModelKind.OBJECT || (kind === helpers_1.ModelKind.UNION && ((_a = model.type) === null || _a === void 0 ? void 0 : _a.includes('object')))) {
            return this.renderClass(model, inputModel);
        }
        else if (kind === helpers_1.ModelKind.ENUM) {
            return this.renderEnum(model, inputModel);
        }
        __1.Logger.warn(`Java generator, cannot generate this type of model, ${model.$id}`);
        return Promise.resolve(models_1.RenderOutput.toRenderOutput({ result: '', renderedName: '', dependencies: [] }));
    }
    /**
     * Render a complete model result where the model code, library and model dependencies are all bundled appropriately.
     *
     * For Java you need to specify which package the model is placed under.
     *
     * @param model
     * @param inputModel
     * @param options used to render the full output
     */
    renderCompleteModel(model, inputModel, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, Constants_1.isReservedJavaKeyword)(options.packageName)) {
                throw new Error(`You cannot use reserved Java keyword (${options.packageName}) as package name, please use another.`);
            }
            const outputModel = yield this.render(model, inputModel);
            const modelDependencies = model.getNearestDependencies().map((dependencyModelName) => {
                var _a;
                const formattedDependencyModelName = ((_a = this.options.namingConvention) === null || _a === void 0 ? void 0 : _a.type) ? this.options.namingConvention.type(dependencyModelName, { inputModel, model: inputModel.models[String(dependencyModelName)], reservedKeywordCallback: Constants_1.isReservedJavaKeyword }) : dependencyModelName;
                return `import ${options.packageName}.${formattedDependencyModelName};`;
            });
            const outputContent = `package ${options.packageName};
${modelDependencies.join('\n')}
${outputModel.dependencies.join('\n')}
${outputModel.result}`;
            return models_1.RenderOutput.toRenderOutput({ result: outputContent, renderedName: outputModel.renderedName, dependencies: outputModel.dependencies });
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
    renderEnum(model, inputModel) {
        return __awaiter(this, void 0, void 0, function* () {
            const presets = this.getPresets('enum');
            const renderer = new EnumRenderer_1.EnumRenderer(this.options, this, presets, model, inputModel);
            const result = yield renderer.runSelfPreset();
            const renderedName = renderer.nameType(model.$id, model);
            return models_1.RenderOutput.toRenderOutput({ result, renderedName, dependencies: renderer.dependencies });
        });
    }
}
exports.JavaGenerator = JavaGenerator;
JavaGenerator.defaultOptions = Object.assign(Object.assign({}, AbstractGenerator_1.defaultGeneratorOptions), { defaultPreset: JavaPreset_1.JAVA_DEFAULT_PRESET, collectionType: 'Array', namingConvention: helpers_1.CommonNamingConventionImplementation });
//# sourceMappingURL=JavaGenerator.js.map