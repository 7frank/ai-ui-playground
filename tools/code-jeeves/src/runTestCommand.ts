import { createTestRunnerFromTask } from "./source-test-validate";
import { $ } from "bun";
import { runCommand } from "./runCommand";

import { TaskSchema } from "./types/taskFileSchema";
import { getLanguageConfigFromTask } from "./languageConfigurations";

export async function runTestCommand(entry:TaskSchema,testCommand: string, sourceFilePath: string, testFilePath: string) {

   const languageConfig=getLanguageConfigFromTask(entry)

  const r = await runCommand(testCommand);
  if (r.stderr == "") {
    console.log("Test succeeded");
    console.log(r.stdout);
  } else {
    console.log("Test failed");

    const testResult = r.stderr!;

    const sourceFile = await $`cat ${sourceFilePath}`.text();
    const testFile = await $`cat ${testFilePath}`.text();

    const res = await createTestRunnerFromTask(
      entry,
      { sourceFile, testFile, testResult },
      languageConfig
    );

    console.log("Fixed code:");
    console.log(res.sourceCode);
  }
}
