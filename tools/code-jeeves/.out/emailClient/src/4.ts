

/**
 * Creates a new file for the main program in TypeScript.
 * @param fileName The name of the file to be created.
 * @param extension The file extension to be used.
 * @returns The newly created file.
 */
export function createMainFile(fileName: string, extension: string): File {
  const file: File = {
    name: fileName,
    extension: extension,
    language: 'TypeScript',
    preferences: 'cmd-ts'
  };

  return file;
}
