"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isReservedTypeScriptKeyword = exports.RESERVED_TYPESCRIPT_KEYWORDS = void 0;
const Constants_1 = require("../javascript/Constants");
exports.RESERVED_TYPESCRIPT_KEYWORDS = [
    'break',
    'case',
    'catch',
    'class',
    'const',
    'continue',
    'debugger',
    'default',
    'delete',
    'do',
    'else',
    'enum',
    'export',
    'extends',
    'false',
    'finally',
    'for',
    'function',
    'if',
    'import',
    'in',
    'instanceof',
    'new',
    'null',
    'return',
    'super',
    'switch',
    'this',
    'throw',
    'true',
    'try',
    'typeof',
    'var',
    'void',
    'while',
    'with',
    'any',
    'boolean',
    'constructor',
    'declare',
    'get',
    'module',
    'require',
    'number',
    'set',
    'string',
    'symbol',
    'type',
    'from',
    'of',
    // Strict mode reserved words
    'arguments',
    'as',
    'implements',
    'interface',
    'let',
    'package',
    'private',
    'protected',
    'public',
    'static',
    'yield'
];
/**
 * Not only do we need to check reserved TS keywords, but we have a transitive dependency
 * on JS keywords as well because of potential transpilation process.
 */
function isReservedTypeScriptKeyword(word) {
    return exports.RESERVED_TYPESCRIPT_KEYWORDS.includes(word) && (0, Constants_1.isReservedJavaScriptKeyword)(word);
}
exports.isReservedTypeScriptKeyword = isReservedTypeScriptKeyword;
//# sourceMappingURL=Constants.js.map