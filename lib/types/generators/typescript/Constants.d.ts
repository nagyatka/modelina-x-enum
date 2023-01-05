export declare const RESERVED_TYPESCRIPT_KEYWORDS: string[];
/**
 * Not only do we need to check reserved TS keywords, but we have a transitive dependency
 * on JS keywords as well because of potential transpilation process.
 */
export declare function isReservedTypeScriptKeyword(word: string): boolean;
//# sourceMappingURL=Constants.d.ts.map