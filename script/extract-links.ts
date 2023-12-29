import * as fs from "fs";
import * as path from "path";

type FooType = {
  label: string;
  url: string;
  type: "double-bracket" | "markdown" | "plain";
};

// Function to parse a file and return the graph data for double bracket notations like: [[foo]] where foo is a markdown(x) file somewhere in the repo e.g. ../bar/foo.md
function parseDoubleBracketNotation(
  filePath: string,
  graph: { [key: string]: FooType[] }
): { [key: string]: FooType[] } {
  const content = fs.readFileSync(filePath, "utf-8");
  const matches = content.match(/\[\[(.*?)\]\]/g);

  if (matches) {
    // const fileId = path.basename(filePath, path.extname(filePath));

    matches.forEach((match) => {
      const linkedId = match.slice(2, -2);
      if (!graph[filePath]) {
        graph[filePath] = [];
      }
      graph[filePath].push({
        label: linkedId, // TODO extract additional info via frontmatter
        url: "TODO", // TODO find file in repository
        type: "double-bracket",
      });
    });
  }

  return graph;
}

// Function to parse a file and return the graph data for Markdown-style links e.g. [label](relative-or-absolute-url)
function parseMarkdownStyle(
  filePath: string,
  graph: { [key: string]: FooType[] }
): { [key: string]: FooType[] } {
  const content = fs.readFileSync(filePath, "utf-8");
  const markdownLinkRegex = /\[([^\]]+)\]\(([^\)]+)\)/g;

  let match;
  while ((match = markdownLinkRegex.exec(content)) !== null) {
    const label = match[1];
    const href = match[2];

    const fileId = label;
    const linkedId = path.basename(href, path.extname(href));

    if (!graph[filePath]) {
      graph[filePath] = [];
    }

    graph[filePath].push({
      label,
      url: href,
      type: "markdown",
    });
  }

  return graph;
}

function parseNormalLinks(
  filePath: string,
  graph: { [key: string]: FooType[] }
): { [key: string]: FooType[] } {
  const content = fs.readFileSync(filePath, "utf-8");
  // Regex to match typical URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  // Regex to detect Markdown and double square bracket links
  const markdownLinkRegex = /\[([^\]]+)\]\(([^\)]+)\)/;
  const doubleSquareBracketRegex = /\[\[([^\]]+)\]\]/;

  content.split("\n").forEach((line) => {
    // Skip lines that match Markdown or double square bracket links
    if (markdownLinkRegex.test(line) || doubleSquareBracketRegex.test(line)) {
      return;
    }

    let match;
    while ((match = urlRegex.exec(line)) !== null) {
      const href = match[1];

      // The fileId and linkedId can be derived or formatted as per your requirements
      const fileId = path.basename(filePath);
      const linkedId = path.basename(href, path.extname(href));

      if (!graph[fileId]) {
        graph[fileId] = [];
      }

      graph[fileId].push({
        label: href, // or any other label format you prefer
        url: href,
        type: "plain",
      });
    }
  });

  return graph;
}

// Function to traverse files recursively and call the parse functions
export function traverseFolder(folderPath: string): {
  [key: string]: FooType[];
} {
  const graph: {
    [key: string]: FooType[];
  } = {};

  function traverse(
    filePath: string,
    parseFunction: (
      filePath: string,
      graph: { [key: string]: FooType[] }
    ) => { [key: string]: FooType[] }
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
  traverse(folderPath, parseDoubleBracketNotation);
  traverse(folderPath, parseMarkdownStyle);
  traverse(folderPath, parseNormalLinks);

  return graph;
}

// Example usage
const folderPath = "./src";
const parsedGraph = traverseFolder(folderPath);
console.log(JSON.stringify(parsedGraph, null, "  "));
