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
exports.AbstractGenerator = exports.defaultGeneratorOptions = void 0;
const models_1 = require("../models");
const processors_1 = require("../processors");
const helpers_1 = require("../helpers");
const utils_1 = require("../utils");
exports.defaultGeneratorOptions = {
    indentation: {
        type: helpers_1.IndentationTypes.SPACES,
        size: 2,
    }
};
/**
 * Abstract generator which must be implemented by each language
 */
class AbstractGenerator {
    constructor(languageName, defaultOptions, passedOptions) {
        this.languageName = languageName;
        this.options = this.mergeOptions(defaultOptions, passedOptions);
    }
    process(input) {
        return processors_1.InputProcessor.processor.process(input, this.options.processorOptions);
    }
    /**
     * Generates the full output of a model, instead of a scattered model.
     *
     * OutputModels result is no longer the model itself, but including package, package dependencies and model dependencies.
     *
     * @param input
     * @param options to use for rendering full output
     */
    generateCompleteModels(input, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const inputModel = yield this.processInput(input);
            const renders = Object.values(inputModel.models).map((model) => __awaiter(this, void 0, void 0, function* () {
                const renderedOutput = yield this.renderCompleteModel(model, inputModel, options);
                return models_1.OutputModel.toOutputModel({
                    result: renderedOutput.result,
                    modelName: renderedOutput.renderedName,
                    dependencies: renderedOutput.dependencies,
                    model,
                    inputModel
                });
            }));
            return Promise.all(renders);
        });
    }
    /**
     * Generates a scattered model where dependencies and rendered results are separated.
     *
     * @param input
     */
    generate(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const inputModel = yield this.processInput(input);
            const renders = Object.values(inputModel.models).map((model) => __awaiter(this, void 0, void 0, function* () {
                const renderedOutput = yield this.render(model, inputModel);
                return models_1.OutputModel.toOutputModel({
                    result: renderedOutput.result,
                    modelName: renderedOutput.renderedName,
                    dependencies: renderedOutput.dependencies,
                    model,
                    inputModel
                });
            }));
            return Promise.all(renders);
        });
    }
    /**
     * Process any of the input formats to the appropriate CommonInputModel type.
     *
     * @param input
     */
    processInput(input) {
        if (input instanceof models_1.CommonInputModel) {
            return Promise.resolve(input);
        }
        return this.process(input);
    }
    getPresets(presetType) {
        const filteredPresets = [];
        const defaultPreset = this.options.defaultPreset;
        if (defaultPreset !== undefined) {
            filteredPresets.push([defaultPreset[String(presetType)], undefined]);
        }
        const presets = this.options.presets || [];
        for (const p of presets) {
            if ((0, utils_1.isPresetWithOptions)(p)) {
                const preset = p.preset[String(presetType)];
                if (preset) {
                    filteredPresets.push([preset, p.options]);
                }
            }
            else {
                const preset = p[String(presetType)];
                if (preset) {
                    filteredPresets.push([preset, undefined]);
                }
            }
        }
        return filteredPresets;
    }
    mergeOptions(defaultOptions = {}, passedOptions = {}) {
        return Object.assign(Object.assign(Object.assign({}, exports.defaultGeneratorOptions), defaultOptions), passedOptions);
    }
}
exports.AbstractGenerator = AbstractGenerator;
//# sourceMappingURL=AbstractGenerator.js.map