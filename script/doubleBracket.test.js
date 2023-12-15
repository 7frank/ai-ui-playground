import * as assert from "assert";
import * as mock from "mock-fs";
import { traverseFolder } from "./extract-links";

// Test the traverseFolder function for double bracket notations
describe("Traverse Folder for Double Bracket Notations", () => {
  beforeEach(() => {
    mock({
      "./test-files": {
        "file1.md": "Content with [[linkedFile1]]",
        "file2.md": "Content with [[linkedFile2]]",
      },
    });
  });

  afterEach(() => {
    mock.restore();
  });

  it("should traverse a folder and build a graph for double bracket notations", () => {
    const folderPath = "./test-files";
    const parsedGraph = traverseFolder(folderPath);

    assert.ok(parsedGraph);
    assert.deepStrictEqual(parsedGraph["file1"], [
      {
        id: "linkedFile1",
        url: "linkedFile1",
        filename: `${folderPath}/file1.md`,
      },
    ]);
    assert.deepStrictEqual(parsedGraph["file2"], [
      {
        id: "linkedFile2",
        url: "linkedFile2",
        filename: `${folderPath}/file2.md`,
      },
    ]);
  });

  // Add more test cases or edge cases as needed
});
