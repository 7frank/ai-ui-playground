

import * as fs from 'fs';

/**
 * Initialize the project with a package.json file
 * @param fileName The name of the file to be created
 * @returns A promise that resolves when the file is successfully created
 */
export function initializeProject(fileName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const packageFile = {
      name: fileName,
      version: '1.0.0',
      description: '',
      main: 'index.js',
      scripts: {
        test: 'echo "Error: no test specified" && exit 1'
      },
      author: '',
      license: 'ISC'
    };

    const packageJson = JSON.stringify(packageFile, null, 2);

    fs.writeFile(fileName, packageJson, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// Infer language from file extension
const language = fileName.split('.')[1];
