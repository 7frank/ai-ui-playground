import { TaskSchema } from "./types/taskFileSchema";
import {
  createImplementationSourceCodeFromTask,
  createTestRunnerFromTask,
  createTestSourceCodeFromTask,
} from "./source-test-validate";
import { getLanguageConfigFromTask } from "./languageConfigurations";
import { $ } from "bun";

export const entry: TaskSchema = {
  id: "getCharacterByName",
  task: "create a function that 'queries the star wars api and returns a character by name'.",
  ext: "ts",
  declaration:
    "async function getCharacterByName(name:String):Promise<StarWarsCharacterDetails>",
  preferences: "use fetch",
};

const languageConfig = getLanguageConfigFromTask(entry);

// const res = await createImplementationSourceCodeFromTask(entry, languageConfig);
// console.log(`Success goto: .out/${entry.id}.ts`);
// await $`echo ${res.sourceCode} > .out/${entry.id}.ts`;

const testFile = `.out/${entry.id}.test.ts`;
// const res = await createTestSourceCodeFromTask(entry, languageConfig);

// console.log(`Success goto: ${testFile}`);
// await $`echo ${res.sourceCode} > ${testFile}`;

// console.log(`you can run 'bun test ./${testFile}'`)

const testCommand = languageConfig?.testCommand?.replace(
  "{filename}",
  testFile,
);

console.log("testCommand", testCommand);

try {
  // TODO check test command
  // await $`${testCommand}`
  await $`pwd`
  const res = await $`bun test ./${testFile}`.text().catch((e)=> console.log("catch",e.message) );
  console.log("YAY");
  console.log(res);
} catch (e) {
  console.log("NAY");
  console.error(e.message);
  //createTestRunnerFromTask(entry,{}, languageConfig);
}
