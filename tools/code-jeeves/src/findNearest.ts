import fs from "fs";
import path from "path";

export const findNearestFileDirectory = (
  startDir = ".",
  fileName = "package.json",
) => {
  let currentDir = startDir;

  while (true) {
    const filePath = path.join(currentDir, fileName);

    if (fs.existsSync(filePath)) {
      return currentDir; // Return the directory containing the specified file
    }

    const parentDir = path.dirname(currentDir);

    if (parentDir === currentDir) {
      // Reached the root of the filesystem without finding the file
      return null;
    }

    currentDir = parentDir;
  }
};
