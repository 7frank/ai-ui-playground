import * as assert from "assert";
import { describe, it } from "node:test";
import * as mock from "mock-fs";
import { traverseFolder } from "./extract-links";

// Test the traverseFolder function for Markdown-style links
describe("Traverse Folder for Markdown-style Links", () => {
  beforeEach(() => {
    mock({
      "./test-files": {
        "file3.md": "Content with [linkedFile3](linkedFile3.md)",
        "file4.md": "Content with [linkedFile4](linkedFile4.md)",
        "emptyFile.md": "", // Test an empty file
      },
    });
  });

  afterEach(() => {
    mock.restore();
  });

  it("should traverse a folder and build a graph for Markdown-style links", () => {
    const folderPath = "./test-files";
    const parsedGraph = traverseFolder(folderPath);

    assert.ok(parsedGraph);
    assert.deepStrictEqual(parsedGraph["file3"], [
      {
        id: "linkedFile3",
        url: "linkedFile3.md",
        filename: `${folderPath}/file3.md`,
      },
    ]);
    assert.deepStrictEqual(parsedGraph["file4"], [
      {
        id: "linkedFile4",
        url: "linkedFile4.md",
        filename: `${folderPath}/file4.md`,
      },
    ]);
  });

  it("should handle an empty file", () => {
    const folderPath = "./test-files";
    const parsedGraph = traverseFolder(folderPath);

    assert.ok(parsedGraph);
    assert.deepStrictEqual(parsedGraph["emptyFile"], []);
  });

  // Add more test cases or edge cases as needed
});
