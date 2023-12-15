import * as fs from "fs";
import * as path from "path";

// Function to parse a file and return the graph data for double bracket notations
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

// Function to parse a file and return the graph data for Markdown-style links
function parseFile2(
  filePath: string,
  graph: { [key: string]: string[] }
): { [key: string]: string[] } {
  const content = fs.readFileSync(filePath, "utf-8");
  const markdownLinkRegex = /\[([^\]]+)\]\(([^\)]+)\)/g;

  let match;
  while ((match = markdownLinkRegex.exec(content)) !== null) {
    const label = match[1];
    const href = match[2];

    // Assuming the label is the linked ID in this case
    const fileId = label;
    const linkedId = path.basename(href, path.extname(href));

    if (!graph[fileId]) {
      graph[fileId] = [];
    }

    graph[fileId].push(linkedId);
  }

  return graph;
}

// Function to traverse files recursively and call the parseFile and parseFile2 functions
function traverseFolder(folderPath: string): { [key: string]: string[] } {
  const graph: { [key: string]: string[] } = {};

  function traverse(
    filePath: string,
    parseFunction: (
      filePath: string,
      graph: { [key: string]: string[] }
    ) => { [key: string]: string[] }
  ) {
    const files = fs.readdirSync(filePath);

    files.forEach((file) => {
      const fullPath = path.join(filePath, file);

      if (fs.statSync(fullPath).isDirectory()) {
        traverse(fullPath, parseFunction);
      } else if (
        path.extname(fullPath) === ".md" ||
        path.extname(fullPath) === ".mdx"
      ) {
        parseFunction(fullPath, graph);
      }
    });
  }

  // Call both parse functions for each file
  traverse(folderPath, parseFile);
  traverse(folderPath, parseFile2);

  return graph;
}

// Example usage
const folderPath = "./src";
const parsedGraph = traverseFolder(folderPath);
console.log(parsedGraph);
