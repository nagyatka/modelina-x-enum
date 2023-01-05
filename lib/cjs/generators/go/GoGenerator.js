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
exports.GoGenerator = exports.GoNamingConventionImplementation = void 0;
const AbstractGenerator_1 = require("../AbstractGenerator");
const models_1 = require("../../models");
const helpers_1 = require("../../helpers");
const GoPreset_1 = require("./GoPreset");
const StructRenderer_1 = require("./renderers/StructRenderer");
const EnumRenderer_1 = require("./renderers/EnumRenderer");
const change_case_1 = require("change-case");
const LoggingInterface_1 = require("../../utils/LoggingInterface");
const Constants_1 = require("./Constants");
/**
 * A GoNamingConvention implementation for Go
 */
exports.GoNamingConventionImplementation = {
    type: (name, ctx) => {
        if (!name) {
            return '';
        }
        let formattedName = helpers_1.FormatHelpers.toPascalCase(name, { transform: change_case_1.pascalCaseTransformMerge });
        if (ctx.reservedKeywordCallback !== undefined && ctx.reservedKeywordCallback(formattedName)) {
            formattedName = helpers_1.FormatHelpers.toPascalCase(`reserved_${formattedName}`);
        }
        return formattedName;
    },
    // eslint-disable-next-line sonarjs/no-identical-functions
    field: (name, ctx) => {
        if (!name) {
            return '';
        }
        let formattedName = helpers_1.FormatHelpers.toPascalCase(name, { transform: change_case_1.pascalCaseTransformMerge });
        if (ctx.reservedKeywordCallback !== undefined && ctx.reservedKeywordCallback(formattedName)) {
            formattedName = helpers_1.FormatHelpers.toPascalCase(`reserved_${formattedName}`);
            if (Object.keys(ctx.model.properties || {}).includes(formattedName)) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                return exports.GoNamingConventionImplementation.field(`reserved_${formattedName}`, ctx);
            }
        }
        return formattedName;
    }
};
/**
 * Generator for Go
 */
class GoGenerator extends AbstractGenerator_1.AbstractGenerator {
    constructor(options = GoGenerator.defaultOptions) {
        super('Go', GoGenerator.defaultOptions, options);
    }
    reservedGoKeyword(name) {
        return (0, Constants_1.isReservedGoKeyword)(name);
    }
    render(model, inputModel) {
        var _a;
        const kind = helpers_1.TypeHelpers.extractKind(model);
        switch (kind) {
            case helpers_1.ModelKind.UNION:
                // We don't support union in Go generator, however, if union is an object, we render it as a struct.
                if (!((_a = model.type) === null || _a === void 0 ? void 0 : _a.includes('object'))) {
                    break;
                }
                return this.renderStruct(model, inputModel);
            case helpers_1.ModelKind.OBJECT:
                return this.renderStruct(model, inputModel);
            case helpers_1.ModelKind.ENUM:
                return this.renderEnum(model, inputModel);
        }
        LoggingInterface_1.Logger.warn(`Go generator, cannot generate this type of model, ${model.$id}`);
        return Promise.resolve(models_1.RenderOutput.toRenderOutput({ result: '', renderedName: '', dependencies: [] }));
    }
    /**
     * Render a complete model result where the model code, library and model dependencies are all bundled appropriately.
     *
     * @param model
     * @param inputModel
     * @param options
     */
    renderCompleteModel(model, inputModel, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const outputModel = yield this.render(model, inputModel);
            let importCode = '';
            if (outputModel.dependencies.length > 0) {
                const dependencies = outputModel.dependencies.map((dependency) => { return `"${dependency}"`; }).join('\n');
                importCode = `import (  
  ${dependencies}
)`;
            }
            const outputContent = `
package ${options.packageName}
${importCode}
${outputModel.result}`;
            return models_1.RenderOutput.toRenderOutput({ result: outputContent, renderedName: outputModel.renderedName, dependencies: outputModel.dependencies });
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
    renderStruct(model, inputModel) {
        return __awaiter(this, void 0, void 0, function* () {
            const presets = this.getPresets('struct');
            const renderer = new StructRenderer_1.StructRenderer(this.options, this, presets, model, inputModel);
            const result = yield renderer.runSelfPreset();
            const renderedName = renderer.nameType(model.$id, model);
            return models_1.RenderOutput.toRenderOutput({ result, renderedName, dependencies: renderer.dependencies });
        });
    }
}
exports.GoGenerator = GoGenerator;
GoGenerator.defaultOptions = Object.assign(Object.assign({}, AbstractGenerator_1.defaultGeneratorOptions), { defaultPreset: GoPreset_1.GO_DEFAULT_PRESET, namingConvention: exports.GoNamingConventionImplementation });
//# sourceMappingURL=GoGenerator.js.map