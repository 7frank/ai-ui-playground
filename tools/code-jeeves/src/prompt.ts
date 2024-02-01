import { TaskSchema } from "./types/taskFileSchema";
import {
  createImplementationSourceCodeFromTask,
  createTestRunnerFromTask,
  createTestSourceCodeFromTask,
} from "./source-test-validate";
import { getLanguageConfigFromTask } from "./languageConfigurations";
import { $ } from "bun";
import { fileSelectQuestion } from "./questions";
import { runCommand } from "./runCommand";
import {
  createLcSourceCodeImpl,
  createLcTestCodeImpl,
} from "./lc/createLcSourceCodeImpl";

export const entry: TaskSchema = {
  id: "getCharacterByName",
  task: "create a function that 'queries the star wars api and returns a character by name'.",
  ext: "ts",
  declaration:
    "async function getCharacterByName(name:String):Promise<StarWarsCharacterDetails>",
  preferences: "use fetch",
};

const languageConfig = getLanguageConfigFromTask(entry);

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
  const implementationCode=await $`cat ${sourceFilePath}`.text();
  const res = await createLcTestCodeImpl(entry, languageConfig,implementationCode);

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
  // TODO check test command
  // await $`${testCommand}`

  //const res = await $`bun test ./${testFilePath}`.text().catch((e)=> console.log("catch",e.message) );
  const r = await runCommand(testCommand);
  if (r.stderr == "") {
    console.log("Test succeeded");
    console.log(r.stdout);
  } else {
    console.log("Test failed");

    // const testResult = `
    // bun test v1.0.25 (a8ff7be6)

    // .out/getCharacterByName.test.ts:
    // 23 |   name: string,
    // 24 | ): Promise<StarWarsCharacterDetails> {
    // 25 |   const response = await fetch(\`https://swapi.dev/api/people/?search=$\{name\}\`);
    // 26 |   const data = await response.json();
    // 27 |   if (data.count === 0) {
    // 28 |     throw new Error("Character not found");
    //                ^
    // error: Character not found
    //       at /home/freimann/Projects/baby/ai-ui-playground/tools/code-jeeves/.out/getCharacterByName.ts:28:11
    // ✗ getCharacterByName > should return the character details when the character exists [211.79ms]
    // ✓ getCharacterByName > should throw an error when the character does not exist [53.66ms]

    //  1 pass
    //  1 fail
    //  1 expect() calls
    // Ran 2 tests across 1 files. [295.
    // `;

    const testResult = r.stderr;

    const sourceFile = await $`cat ${sourceFilePath}`.text();
    const testFile = await $`cat ${testFilePath}`.text();

    const res = await createTestRunnerFromTask(
      entry,
      { sourceFile, testFile, testResult },
      languageConfig,
    );

    console.log("Fixed code:");
    console.log(res.sourceCode);
  }
}
