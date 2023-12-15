import { execSync } from "child_process";
import * as glob from "glob";

// Use a glob pattern to find all test files
const testFiles = glob.sync(["./src/*.test.js", "./script/*.test.js"]);

// Run each test file
testFiles.forEach((testFile) => {
  console.log("running tests:", testFile);

  try {
    // Replace 'your-test-command' with the actual test command
    const outputBuffer = execSync(`tsx ${testFile}`);

    // Convert the output buffer to a string
    const outputString = outputBuffer.toString("utf-8");
    // Now you can log or manipulate the outputString as needed
    console.log(outputString);
  } catch (error) {
    const errorOutput = error.stdout.toString("utf-8");
    console.error(errorOutput);
  }
});
