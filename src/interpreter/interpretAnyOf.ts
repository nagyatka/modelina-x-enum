import { CommonModel } from '../models/CommonModel';
import { Interpreter, InterpreterOptions, InterpreterSchemaType } from './Interpreter';

/**
 * Interpreter function for allOf keyword.
 * 
 * It either merges allOf schemas into existing model or if allowed, create inheritance.
 * 
 * @param schema 
 * @param model 
 * @param interpreter 
 * @param interpreterOptions to control the interpret process
 */
export default function interpretAnyOf(schema: InterpreterSchemaType, model: CommonModel, interpreter : Interpreter, interpreterOptions: InterpreterOptions = Interpreter.defaultInterpreterOptions): void {
  if (typeof schema === 'boolean' || schema.anyOf === undefined) {return;}
  for (const anyOfSchema of schema.anyOf) {  
    const anyOfModel = interpreter.interpret(anyOfSchema, interpreterOptions);
    if (anyOfModel === undefined) {continue;}
    model.addUnionType(anyOfModel.$id, anyOfModel);
  }
}
