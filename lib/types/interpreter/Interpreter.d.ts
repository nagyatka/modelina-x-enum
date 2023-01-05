import { CommonModel, Draft6Schema, Draft4Schema, SwaggerV2Schema, AsyncapiV2Schema, Draft7Schema } from '../models';
export declare type InterpreterOptions = {
    allowInheritance?: boolean;
};
export declare type InterpreterSchemas = Draft6Schema | Draft4Schema | Draft7Schema | SwaggerV2Schema | AsyncapiV2Schema;
export declare type InterpreterSchemaType = InterpreterSchemas | boolean;
export declare class Interpreter {
    static defaultInterpreterOptions: InterpreterOptions;
    private anonymCounter;
    private seenSchemas;
    /**
     * Transforms a schema into instances of CommonModel by processing all keywords from schema documents and infers the model definition.
     *
     * @param schema
     * @param interpreterOptions to control the interpret process
     */
    interpret(schema: InterpreterSchemaType, options?: InterpreterOptions): CommonModel | undefined;
    /**
     * Function to interpret a schema into a CommonModel.
     *
     * @param model
     * @param schema
     * @param interpreterOptions to control the interpret process
     */
    private interpretSchema;
    private interpretSchemaObject;
    /**
     * Go through a schema and combine the interpreted models together.
     *
     * @param schema to go through
     * @param currentModel the current output
     * @param rootSchema the root schema to use as original schema when merged
     * @param interpreterOptions to control the interpret process
     */
    interpretAndCombineSchema(schema: InterpreterSchemaType | undefined, currentModel: CommonModel, rootSchema: any, interpreterOptions?: InterpreterOptions): void;
    /**
     * Go through multiple schemas and combine the interpreted models together.
     *
     * @param schema to go through
     * @param currentModel the current output
     * @param rootSchema the root schema to use as original schema when merged
     * @param interpreterOptions to control the interpret process
     */
    interpretAndCombineMultipleSchemas(schema: InterpreterSchemaType[] | undefined, currentModel: CommonModel, rootSchema: any, interpreterOptions?: InterpreterOptions): void;
}
//# sourceMappingURL=Interpreter.d.ts.map