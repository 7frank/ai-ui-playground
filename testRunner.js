import { execSync } from "child_process";
import * as glob from "glob";

// Use a glob pattern to find all test files
const testFiles = glob.sync(["./src/*.test.js", "./script/*.test.js"]);

// Run each test file
testFiles.forEach((testFile) => {
  console.log("running tests:", testFile);
  execSync(`node ${testFile}`);
});
