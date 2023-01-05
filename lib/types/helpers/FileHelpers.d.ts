export declare class FileHelpers {
    /**
     * Node specific file writer, which writes the content to the specified filepath.
     *
     * This function is invasive, as it overwrite any existing files with the same name as the model.
     *
     * @param content to write
     * @param filePath to write to
     */
    static writerToFileSystem(content: string, filePath: string): Promise<void>;
}
//# sourceMappingURL=FileHelpers.d.ts.map