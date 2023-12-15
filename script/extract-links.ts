import * as fs from "fs";
import * as path from "path";

// Function to parse a file and return the graph data
function parseFile(
  filePath: string,
  graph: { [key: string]: string[] }
): { [key: string]: string[] } {
  const content = fs.readFileSync(filePath, "utf-8");
  const matches = content.match(/\[\[(.*?)\]\]/g);

  if (matches) {
    const fileId = path.basename(filePath, path.extname(filePath));

    matches.forEach((match) => {
      const linkedId = match.slice(2, -2);
      if (!graph[fileId]) {
        graph[fileId] = [];
      }
      graph[fileId].push(linkedId);
    });
  }

  return graph;
}

// Function to traverse files recursively and call the parseFile function
function traverseFolder(folderPath: string): { [key: string]: string[] } {
  const graph: { [key: string]: string[] } = {};

  function traverse(filePath: string) {
    const files = fs.readdirSync(filePath);

    files.forEach((file) => {
      const fullPath = path.join(filePath, file);

      if (fs.statSync(fullPath).isDirectory()) {
        traverse(fullPath);
      } else if (
        path.extname(fullPath) === ".md" ||
        path.extname(fullPath) === ".mdx"
      ) {
        console.log("parsing", fullPath);
        parseFile(fullPath, graph);
      }
    });
  }

  traverse(folderPath);
  return graph;
}

// Example usage
const folderPath = "./src/";
const parsedGraph = traverseFolder(folderPath);
console.log(parsedGraph);
