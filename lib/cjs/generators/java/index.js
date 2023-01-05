"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JAVA_DEFAULT_PRESET = void 0;
__exportStar(require("./JavaGenerator"), exports);
__exportStar(require("./JavaFileGenerator"), exports);
var JavaPreset_1 = require("./JavaPreset");
Object.defineProperty(exports, "JAVA_DEFAULT_PRESET", { enumerable: true, get: function () { return JavaPreset_1.JAVA_DEFAULT_PRESET; } });
__exportStar(require("./presets"), exports);
//# sourceMappingURL=index.js.map