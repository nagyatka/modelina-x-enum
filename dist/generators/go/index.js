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
exports.GO_DEFAULT_PRESET = void 0;
__exportStar(require("./GoGenerator"), exports);
__exportStar(require("./GoFileGenerator"), exports);
var GoPreset_1 = require("./GoPreset");
Object.defineProperty(exports, "GO_DEFAULT_PRESET", { enumerable: true, get: function () { return GoPreset_1.GO_DEFAULT_PRESET; } });
//# sourceMappingURL=index.js.map