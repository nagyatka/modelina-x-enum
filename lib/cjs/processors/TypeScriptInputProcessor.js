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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeScriptInputProcessor = void 0;
const models_1 = require("../models");
const path_1 = require("path");
const TJS = __importStar(require("typescript-json-schema"));
const JsonSchemaInputProcessor_1 = require("./JsonSchemaInputProcessor");
const AbstractInputProcessor_1 = require("./AbstractInputProcessor");
class TypeScriptInputProcessor extends AbstractInputProcessor_1.AbstractInputProcessor {
    generateProgram(file) {
        return TJS.getProgramFromFiles([(0, path_1.resolve)(file)], TypeScriptInputProcessor.settings.compilerOptions);
    }
    generateJSONSchema(file, typeRequired, options) {
        const mergedOptions = Object.assign(Object.assign({}, TypeScriptInputProcessor.settings), options);
        const program = this.generateProgram(file);
        if (typeRequired === '*') {
            const generator = TJS.buildGenerator(program, mergedOptions);
            if (!generator) {
                throw new Error('Cound not generate all types automatically');
            }
            const symbols = generator.getMainFileSymbols(program);
            return symbols.map(symbol => {
                const schemaFromGenerator = generator.getSchemaForSymbol(symbol);
                schemaFromGenerator.$id = symbol;
                return schemaFromGenerator;
            });
        }
        const schema = TJS.generateSchema(program, typeRequired, mergedOptions);
        if (!schema) {
            return null;
        }
        schema.$id = typeRequired;
        return [schema];
    }
    shouldProcess(input) {
        // checking if input is null
        if ((input === null || undefined) || (input.baseFile === null || undefined)) {
            return false;
        }
        // checking the empty string
        if (Object.keys(input).length === 0 && input.constructor === Object) {
            return false;
        }
        //checking if input structure is correct
        if (typeof input !== 'object' || typeof input.baseFile !== 'string') {
            return false;
        }
        return true;
    }
    process(input, options) {
        const common = new models_1.CommonInputModel();
        if (!this.shouldProcess(input)) {
            return Promise.reject(new Error('Input is not of the valid file format'));
        }
        const { fileContents, baseFile } = input;
        common.originalInput = fileContents;
        // obtain generated schema
        const generatedSchemas = this.generateJSONSchema(baseFile, '*', options === null || options === void 0 ? void 0 : options.typescript);
        if (generatedSchemas) {
            for (const schema of generatedSchemas) {
                const commonModels = JsonSchemaInputProcessor_1.JsonSchemaInputProcessor.convertSchemaToCommonModel(schema);
                common.models = Object.assign(Object.assign({}, common.models), commonModels);
            }
        }
        return Promise.resolve(common);
    }
}
exports.TypeScriptInputProcessor = TypeScriptInputProcessor;
TypeScriptInputProcessor.settings = {
    uniqueNames: false,
    required: true,
    compilerOptions: {
        strictNullChecks: false,
    }
};
//# sourceMappingURL=TypeScriptInputProcessor.js.map