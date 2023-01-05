import { camelCase, pascalCase, paramCase, constantCase } from 'change-case';
export declare enum IndentationTypes {
    TABS = "tabs",
    SPACES = "spaces"
}
interface ReplaceSpecialCharactersOptions {
    separator?: string;
    exclude?: string[];
}
export declare class FormatHelpers {
    /**
     * Upper first char in given string value.
     * @param {string} value to change
     * @returns {string}
     */
    static upperFirst(value: string): string;
    /**
     * Transform into a string with the separator denoted by the next word capitalized.
     * @param {string} value to transform
     * @returns {string}
     */
    static toCamelCase: typeof camelCase;
    /**
     * Transform into a string of capitalized words without separators.
     * @param {string} value to transform
     * @returns {string}
     */
    static toPascalCase: typeof pascalCase;
    /**
     * Transform into a lower cased string with dashes between words.
     * @param {string} value to transform
     * @returns {string}
     */
    static toParamCase: typeof paramCase;
    /**
     * Transform into upper case string with an underscore between words.
     * @param {string} value to transform
     * @returns {string}
     */
    static toConstantCase: typeof constantCase;
    /**
    * Replace special characters (Not 0-9,a-z,A-Z) with character names
    * @param {string} value to transform
    * @param {ReplaceSpecialCharactersOptions} options
    * @returns {string}
    */
    static replaceSpecialCharacters(string: string, options?: ReplaceSpecialCharactersOptions): string;
    /**
     * Ensures breaking text into new lines according to newline char (`\n`) in text.
     * @param {(string | string[])} lines to breaks
     * @returns {string[]}
     */
    static breakLines(lines: string | string[]): string[];
    /**
     * Ensures indentations are prepended to content.
     * @param {string} content to prepend the indentation.
     * @param {number} size the number of indendations to use. 1 by default
     * @param {IndentationTypes} type the type of indendations to use. SPACES by default.
     * @returns {string}
     */
    static indent(content?: string, size?: number, type?: IndentationTypes): string;
    /**
     * Get the indendation string based on how many and which type of indentation are requested.
     * @private
     * @param {number} size the number of indendations to use
     * @param {IndentationTypes} type the type of indendations to use. SPACES by default.
     * @returns {string}
     */
    private static getIndentation;
    /**
     * Render given JSON Schema example to string
     *
     * @param {Array<Any>} examples to render
     * @returns {string}
     */
    static renderJSONExamples(examples: any[]): string;
    static snakeCase(renderName: string): string;
}
export {};
//# sourceMappingURL=FormatHelpers.d.ts.map