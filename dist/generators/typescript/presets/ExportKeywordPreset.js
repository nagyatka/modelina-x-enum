"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TS_EXPORT_KEYWORD_PRESET = void 0;
const renderWithExportKeyword = ({ content, }) => `export ${content}`;
/**
 * Preset which adds export keyword wherever applicable (named exports)
 *
 * @implements {TypeScriptPreset}
 */
exports.TS_EXPORT_KEYWORD_PRESET = {
    class: {
        self({ renderer, model, content }) {
            return renderWithExportKeyword({ renderer, content, item: model });
        },
    },
    interface: {
        self({ renderer, model, content }) {
            return renderWithExportKeyword({ renderer, content, item: model });
        },
    },
    type: {
        self({ renderer, model, content }) {
            return renderWithExportKeyword({ renderer, content, item: model });
        },
    },
    enum: {
        self({ renderer, model, content }) {
            return renderWithExportKeyword({ renderer, content, item: model });
        },
    },
};
//# sourceMappingURL=ExportKeywordPreset.js.map