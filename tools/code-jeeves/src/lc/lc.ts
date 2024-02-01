import { PythonInterpreterTool } from "langchain/experimental/tools/pyinterpreter";
import { TaskSchema } from "../types/taskFileSchema";
import { createLcSourceCodeImpl } from "./createLcSourceCodeImpl";

/***
 * see  https://js.langchain.com/docs/integrations/tools
 * for more langchain tools
 * e.g.
 * - webbrowser https://js.langchain.com/docs/integrations/tools/webbrowser  for RAG functionality
 * - pyinterpreter https://js.langchain.com/docs/integrations/tools/pyinterpreter for code execution
 */

const entry: TaskSchema = {
  id: "getCharacterByName",
  task: "fetch a character from the star wars api",
  ext: "ts",
  declaration:
    "async function getCharacterByName(name:string):Promise<StarWarsCharacterDetails>",
  preferences: "use fetch",
};
const result = await createLcSourceCodeImpl(entry);

console.log(result);
