/**
 * Common internal representation for a model.
 */
export declare class CommonModel {
    extend?: string[];
    originalInput?: any;
    $id?: string;
    type?: string | string[];
    unionType?: {
        [key: string]: CommonModel;
    };
    enum?: any[];
    items?: CommonModel | CommonModel[];
    properties?: {
        [key: string]: CommonModel;
    };
    additionalProperties?: CommonModel;
    patternProperties?: {
        [key: string]: CommonModel;
    };
    $ref?: string;
    required?: string[];
    additionalItems?: CommonModel;
    /**
     * Takes a deep copy of the input object and converts it to an instance of CommonModel.
     *
     * @param object to transform
     * @returns CommonModel instance of the object
     */
    static toCommonModel(object: Record<string, unknown> | CommonModel): CommonModel;
    private static internalToSchema;
    /**
     * Retrieves data from originalInput by given key
     *
     * @param key given key
     * @returns {any}
     */
    getFromOriginalInput<K extends keyof any>(key: K): any;
    /**
     * Set the types of the model
     *
     * @param type
     */
    setType(type: string | string[] | undefined): void;
    /**
     * Removes type(s) from model type
     *
     * @param types
     */
    removeType(typesToRemove: string | string[]): void;
    /**
     * Adds types to the existing model types.
     *
     * Makes sure to only keep a single type incase of duplicates.
     *
     * @param types which types we should try and add to the existing output
     */
    addTypes(types: string[] | string): void;
    /**
     * Checks if given property name is required in object
     *
     * @param propertyName given property name
     * @returns {boolean}
     */
    isRequired(propertyName: string): boolean;
    /**
     * Adds an item to the model.
     *
     * If items already exist the two are merged.
     *
     * @param itemModel
     * @param originalInput corresponding input that got interpreted to this model
     */
    addItem(itemModel: CommonModel, originalInput: any): void;
    /**
     * Adds a tuple to the model.
     *
     * If a item already exist it will be merged.
     *
     * @param tupleModel
     * @param originalInput corresponding input that got interpreted to this model
     * @param index
     */
    addItemTuple(tupleModel: CommonModel, originalInput: any, index: number): void;
    /**
     * Add enum value to the model.
     *
     * Ensures no duplicates are added.
     *
     * @param enumValue
     */
    addEnum(enumValue: any): void;
    /**
     * Remove enum from model.
     *
     * @param enumValue
     */
    removeEnum(enumsToRemove: any | any[]): void;
    addUnionType(typeName: string | undefined, model: CommonModel): void;
    /**
     * Adds a property to the model.
     * If the property already exist the two are merged.
     *
     * @param propertyName
     * @param propertyModel
     * @param originalInput corresponding input that got interpreted to this model
     */
    addProperty(propertyName: string, propertyModel: CommonModel, originalInput: any): void;
    /**
     * Adds additionalProperty to the model.
     * If another model already exist the two are merged.
     *
     * @param additionalPropertiesModel
     * @param originalInput corresponding input that got interpreted to this model corresponding input that got interpreted to this model
     */
    addAdditionalProperty(additionalPropertiesModel: CommonModel, originalInput: any): void;
    /**
     * Adds additionalItems to the model.
     * If another model already exist the two are merged.
     *
     * @param additionalItemsModel
     * @param originalInput corresponding input that got interpreted to this model
     */
    addAdditionalItems(additionalItemsModel: CommonModel, originalInput: any): void;
    /**
     * Adds a patternProperty to the model.
     * If the pattern already exist the two models are merged.
     *
     * @param pattern
     * @param patternModel
     * @param originalInput corresponding input that got interpreted to this model
     */
    addPatternProperty(pattern: string, patternModel: CommonModel, originalInput: any): void;
    /**
     * Adds another model this model should extend.
     *
     * It is only allowed to extend if the other model have $id and is not already being extended.
     *
     * @param extendedModel
     */
    addExtendedModel(extendedModel: CommonModel): void;
    /**
     * Returns an array of unique `$id`s from all the CommonModel's this model depends on.
     */
    getNearestDependencies(): string[];
    /**
     * Merge two common model properties together
     *
     * @param mergeTo
     * @param mergeFrom
     * @param originalInput corresponding input that got interpreted to this model
     * @param alreadyIteratedModels
     */
    private static mergeProperties;
    /**
     * Merge two common model additionalProperties together
     *
     * @param mergeTo
     * @param mergeFrom
     * @param originalInput corresponding input that got interpreted to this model
     * @param alreadyIteratedModels
     */
    private static mergeAdditionalProperties;
    /**
     * Merge two common model additionalItems together
     *
     * @param mergeTo
     * @param mergeFrom
     * @param originalInput corresponding input that got interpreted to this model
     * @param alreadyIteratedModels
     */
    private static mergeAdditionalItems;
    /**
     * Merge two common model pattern properties together
     *
     * @param mergeTo
     * @param mergeFrom
     * @param originalInput corresponding input that got interpreted to this model
     * @param alreadyIteratedModels
     */
    private static mergePatternProperties;
    /**
     * Merge items together, prefer tuples over simple array since it is more strict.
     *
     * @param mergeTo
     * @param mergeFrom
     * @param originalInput corresponding input that got interpreted to this model
     * @param alreadyIteratedModels
     */
    private static mergeItems;
    /**
     * Merge types together
     *
     * @param mergeTo
     * @param mergeFrom
     */
    private static mergeTypes;
    /**
     * Only merge if left side is undefined and right side is sat OR both sides are defined
     *
     * @param mergeTo
     * @param mergeFrom
     * @param originalInput corresponding input that got interpreted to this model
     * @param alreadyIteratedModels
     */
    static mergeCommonModels(mergeTo: CommonModel | undefined, mergeFrom: CommonModel, originalInput: any, alreadyIteratedModels?: Map<CommonModel, CommonModel>): CommonModel;
}
//# sourceMappingURL=CommonModel.d.ts.map