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
exports.TypeScriptGenerator = void 0;
const PresetHelpers_1 = require("../../helpers/PresetHelpers");
const AbstractGenerator_1 = require("../AbstractGenerator");
const models_1 = require("../../models");
const helpers_1 = require("../../helpers");
const presets_1 = require("./presets");
const TypeScriptPreset_1 = require("./TypeScriptPreset");
const ClassRenderer_1 = require("./renderers/ClassRenderer");
const InterfaceRenderer_1 = require("./renderers/InterfaceRenderer");
const EnumRenderer_1 = require("./renderers/EnumRenderer");
const TypeRenderer_1 = require("./renderers/TypeRenderer");
/**
 * Generator for TypeScript
 */
class TypeScriptGenerator extends AbstractGenerator_1.AbstractGenerator {
    constructor(options = TypeScriptGenerator.defaultOptions) {
        super('TypeScript', TypeScriptGenerator.defaultOptions, options);
    }
    /**
     * Render a complete model result where the model code, library and model dependencies are all bundled appropriately.
     *
     * @param model
     * @param inputModel
     * @param options
     */
    renderCompleteModel(model, inputModel, { moduleSystem = 'ESM', exportType = 'default' }) {
        return __awaiter(this, void 0, void 0, function* () {
            // Shallow copy presets so that we can restore it once we are done
            const originalPresets = [...(this.options.presets ? this.options.presets : [])];
            // Add preset that adds the `export` keyword if it hasn't already been added
            if (moduleSystem === 'ESM' &&
                exportType === 'named' &&
                !(0, PresetHelpers_1.hasPreset)(originalPresets, presets_1.TS_EXPORT_KEYWORD_PRESET)) {
                this.options.presets = [presets_1.TS_EXPORT_KEYWORD_PRESET, ...originalPresets];
            }
            const outputModel = yield this.render(model, inputModel);
            let modelDependencies = model.getNearestDependencies();
            //Ensure model dependencies have their rendered name
            modelDependencies = modelDependencies.map((dependencyModelName) => {
                var _a;
                return ((_a = this.options.namingConvention) === null || _a === void 0 ? void 0 : _a.type) ? this.options.namingConvention.type(dependencyModelName, { inputModel, model: inputModel.models[String(dependencyModelName)] }) : dependencyModelName;
            });
            //Filter out any dependencies that is recursive to itself
            modelDependencies = modelDependencies.filter((dependencyModelName) => {
                return dependencyModelName !== outputModel.renderedName;
            });
            //Create the correct dependency imports
            modelDependencies = modelDependencies.map((dependencyName) => {
                const dependencyObject = exportType === 'named' ? `{${dependencyName}}` : dependencyName;
                return moduleSystem === 'CJS'
                    ? `const ${dependencyObject} = require('./${dependencyName}');`
                    : `import ${dependencyObject} from './${dependencyName}';`;
            });
            //Ensure we expose the model correctly, based on the module system and export type
            const cjsExport = exportType === 'default'
                ? `module.exports = ${outputModel.renderedName};`
                : `exports.${outputModel.renderedName} = ${outputModel.renderedName};`;
            const esmExport = exportType === 'default'
                ? `export default ${outputModel.renderedName};\n`
                : '';
            const modelCode = `${outputModel.result}\n${moduleSystem === 'CJS' ? cjsExport : esmExport}`;
            const outputContent = `${[...modelDependencies, ...outputModel.dependencies].join('\n')}

${modelCode}`;
            // Restore presets array from original copy
            this.options.presets = originalPresets;
            return models_1.RenderOutput.toRenderOutput({ result: outputContent, renderedName: outputModel.renderedName, dependencies: outputModel.dependencies });
        });
    }
    render(model, inputModel) {
        const kind = helpers_1.TypeHelpers.extractKind(model);
        switch (kind) {
            case helpers_1.ModelKind.OBJECT: {
                return this.renderModelType(model, inputModel);
            }
            case helpers_1.ModelKind.ENUM: {
                if (this.options.enumType === 'union') {
                    return this.renderType(model, inputModel);
                }
                return this.renderEnum(model, inputModel);
            }
            case helpers_1.ModelKind.CONST:
                return this.renderType(model, inputModel);
            default: return this.renderType(model, inputModel);
        }
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
    renderInterface(model, inputModel) {
        return __awaiter(this, void 0, void 0, function* () {
            const presets = this.getPresets('interface');
            const renderer = new InterfaceRenderer_1.InterfaceRenderer(this.options, this, presets, model, inputModel);
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
    renderType(model, inputModel) {
        return __awaiter(this, void 0, void 0, function* () {
            const presets = this.getPresets('type');
            const renderer = new TypeRenderer_1.TypeRenderer(this.options, this, presets, model, inputModel);
            const result = yield renderer.runSelfPreset();
            const renderedName = renderer.nameType(model.$id, model);
            return models_1.RenderOutput.toRenderOutput({ result, renderedName, dependencies: renderer.dependencies });
        });
    }
    renderModelType(model, inputModel) {
        const modelType = this.options.modelType;
        if (modelType === 'interface') {
            return this.renderInterface(model, inputModel);
        }
        return this.renderClass(model, inputModel);
    }
}
exports.TypeScriptGenerator = TypeScriptGenerator;
TypeScriptGenerator.defaultOptions = Object.assign(Object.assign({}, AbstractGenerator_1.defaultGeneratorOptions), { renderTypes: true, modelType: 'class', enumType: 'enum', defaultPreset: TypeScriptPreset_1.TS_DEFAULT_PRESET, namingConvention: helpers_1.CommonNamingConventionImplementation });
//# sourceMappingURL=TypeScriptGenerator.js.map