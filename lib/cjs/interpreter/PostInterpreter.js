"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postInterpretModel = void 0;
const models_1 = require("../models");
const utils_1 = require("../utils");
const Utils_1 = require("./Utils");
/**
 * Post process the interpreted model. By applying the following:
 * - Ensure models are split as required
 *
 * @param model
 */
function postInterpretModel(model) {
    const splitModels = [model];
    ensureModelsAreSplit(model, splitModels);
    return splitModels;
}
exports.postInterpretModel = postInterpretModel;
/**
 * This function splits up a model if needed and add the new model to the list of models.
 *
 * @param model check if it should be split up
 * @param iteratedModels which have already been split up
 */
function trySplitModels(model, splitModels, iteratedModels) {
    var _a;
    let modelToReturn = model;
    if ((0, Utils_1.isModelObject)(model) === true || (0, Utils_1.isEnum)(model) === true) {
        utils_1.Logger.info(`Splitting model ${model.$id || 'any'} since it should be on its own`);
        const switchRootModel = new models_1.CommonModel();
        switchRootModel.$ref = model.$id;
        if ((0, Utils_1.isUnionType)(model)) {
            switchRootModel.unionType = model.unionType;
            switchRootModel.$ref = `__UNION=${Object.keys((_a = model.unionType) !== null && _a !== void 0 ? _a : {}).join('|')}`;
        }
        modelToReturn = switchRootModel;
        if (!splitModels.includes(model)) {
            splitModels.push(model);
        }
    }
    ensureModelsAreSplit(model, splitModels, iteratedModels);
    return modelToReturn;
}
/**
 * Split up all models which should and use ref instead.
 *
 * @param model to ensure are split
 * @param iteratedModels which are already split
 */
function ensureModelsAreSplit(model, splitModels, iteratedModels = []) {
    // eslint-disable-next-line sonarjs/no-collapsible-if
    if (iteratedModels.includes(model)) {
        return;
    }
    iteratedModels.push(model);
    if (model.properties) {
        const existingProperties = model.properties;
        for (const [prop, propSchema] of Object.entries(existingProperties)) {
            model.properties[String(prop)] = trySplitModels(propSchema, splitModels, iteratedModels);
        }
    }
    if (model.patternProperties) {
        const existingPatternProperties = model.patternProperties;
        for (const [pattern, patternModel] of Object.entries(existingPatternProperties)) {
            model.patternProperties[String(pattern)] = trySplitModels(patternModel, splitModels, iteratedModels);
        }
    }
    if (model.additionalProperties) {
        model.additionalProperties = trySplitModels(model.additionalProperties, splitModels, iteratedModels);
    }
    if (model.items) {
        let existingItems = model.items;
        if (Array.isArray(existingItems)) {
            for (const [itemIndex, itemModel] of existingItems.entries()) {
                existingItems[Number(itemIndex)] = trySplitModels(itemModel, splitModels, iteratedModels);
            }
        }
        else {
            existingItems = trySplitModels(existingItems, splitModels, iteratedModels);
        }
        model.items = existingItems;
    }
}
//# sourceMappingURL=PostInterpreter.js.map