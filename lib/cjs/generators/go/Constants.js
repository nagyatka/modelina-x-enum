"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isReservedGoKeyword = exports.RESERVED_GO_KEYWORDS = void 0;
exports.RESERVED_GO_KEYWORDS = [
    'break',
    'case',
    'chan',
    'const',
    'continue',
    'default',
    'defer',
    'else',
    'fallthrough',
    'for',
    'func',
    'go',
    'goto',
    'if',
    'import',
    'interface',
    'map',
    'package',
    'range',
    'return',
    'select',
    'struct',
    'switch',
    'type',
    'var'
];
function isReservedGoKeyword(word) {
    return exports.RESERVED_GO_KEYWORDS.includes(word);
}
exports.isReservedGoKeyword = isReservedGoKeyword;
//# sourceMappingURL=Constants.js.map