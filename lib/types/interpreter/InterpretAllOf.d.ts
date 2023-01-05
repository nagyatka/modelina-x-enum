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
export default function interpretAllOf(schema: InterpreterSchemaType, model: CommonModel, interpreter: Interpreter, interpreterOptions?: InterpreterOptions): void;
//# sourceMappingURL=InterpretAllOf.d.ts.map