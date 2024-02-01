import { TaskSchema } from "./types/taskFileSchema";
import {
  createImplementationSourceCodeFromTask,
  createTestSourceCodeFromTask,
} from "./source-test-validate";
import { getLanguageConfigFromTask } from "./languageConfigurations";
import { $ } from "bun";
import { fileSelectQuestion } from "./questions";
import {
  createLcSourceCodeImpl,
  createLcTestCodeImpl,
} from "./lc/createLcSourceCodeImpl";
import { runTestCommand } from "./runTestCommand";

export const entry: TaskSchema = {
  id: "getCharacterByName",
  task: "create a function that 'queries the star wars api and returns a character by name'.",
  ext: "ts",
  declaration:
    "async function getCharacterByName(name:String):Promise<StarWarsCharacterDetails>",
  preferences: "use fetch",
};

export const languageConfig = getLanguageConfigFromTask(entry);

type P = "createImplementation" | "createTest" | "fixImplementationWithTest";

//const reason = "fixImplementationWithTest" as P;
const reason = (
  await fileSelectQuestion([
    "createImplementation",
    "createTest",
    "fixImplementationWithTest",
  ])
).fileName as P;

const sourceFilePath = `.out/${entry.id}.ts`;
const testFilePath = `.out/${entry.id}.test.ts`;

if (reason == "createImplementation") {
  //console.log("using zod-gpt to generate source code")
  // const res = await createImplementationSourceCodeFromTask(
  //   entry,
  //   languageConfig,
  // );

  console.log("using langchain to generate source code");
  const res = await createLcSourceCodeImpl(entry, languageConfig);

  console.log(`Success goto: .out/${entry.id}.ts`);
  await $`echo ${res.sourceCode} > .out/${entry.id}.ts`;
} else if (reason == "createTest") {
  // console.log("using zod-gpt to generate test code")
  // const res = await createTestSourceCodeFromTask(entry, languageConfig);

  console.log("using langchain to generate test code");
  const implementationCode = await $`cat ${sourceFilePath}`.text();
  const res = await createLcTestCodeImpl(
    entry,
    languageConfig,
    implementationCode,
  );

  console.log(`Success goto: ${testFilePath}`);
  await $`echo ${res.sourceCode} > ${testFilePath}`;

  console.log(`you can run 'bun test ./${testFilePath}'`);
} else if (reason == "fixImplementationWithTest") {
  const testCommand = languageConfig?.testCommand?.replace(
    "{filename}",
    testFilePath,
  );

  console.log("testCommand", testCommand);

  if (!testCommand) {
    console.error("missing testCommand");
    process.exit(1);
  }

  try {
    await runTestCommand(entry, testCommand, sourceFilePath, testFilePath);
  } catch (e) {
    console.error("Fixing test currently is optional, also not working");
  }
}
