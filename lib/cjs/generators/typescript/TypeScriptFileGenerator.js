"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.TypeScriptFileGenerator = void 0;
const _1 = require("./");
const path = __importStar(require("path"));
const helpers_1 = require("../../helpers");
class TypeScriptFileGenerator extends _1.TypeScriptGenerator {
    /**
     * Generates all the models to an output directory each model with their own separate files.
     *
     * @param input
     * @param outputDirectory where you want the models generated to
     * @param options
     */
    generateToFiles(input, outputDirectory, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let generatedModels = yield this.generateCompleteModels(input, options || {});
            //Filter anything out that have not been successfully generated
            generatedModels = generatedModels.filter((outputModel) => { return outputModel.modelName !== ''; });
            for (const outputModel of generatedModels) {
                const filePath = path.resolve(outputDirectory, `${outputModel.modelName}.ts`);
                yield helpers_1.FileHelpers.writerToFileSystem(outputModel.result, filePath);
            }
            return generatedModels;
        });
    }
}
exports.TypeScriptFileGenerator = TypeScriptFileGenerator;
//# sourceMappingURL=TypeScriptFileGenerator.js.map