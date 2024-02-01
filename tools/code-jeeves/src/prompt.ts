import { TaskSchema } from "./types/taskFileSchema";
import {
  createImplementationSourceCodeFromTask,
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


const res = await createTestSourceCodeFromTask(entry, languageConfig);
const file=`.out/${entry.id}.test.ts`
console.log(`Success goto: ${file}`);
await $`echo ${res.sourceCode} > ${file}`;

console.log(`you can run 'bun test ./${file}'`)