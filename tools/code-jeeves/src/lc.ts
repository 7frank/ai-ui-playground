import { OpenAI } from "@langchain/openai";
import { PythonInterpreterTool } from "langchain/experimental/tools/pyinterpreter";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { TaskSchema } from "./types/taskFileSchema";

/***
 * see  https://js.langchain.com/docs/integrations/tools
 * for more langchain tools
 * e.g.
 * - webbrowser https://js.langchain.com/docs/integrations/tools/webbrowser  for RAG functionality
 * - pyinterpreter https://js.langchain.com/docs/integrations/tools/pyinterpreter for code execution
 */

const sourceCodeImplementationPrompt = ChatPromptTemplate.fromTemplate(
  `Generate source code that implements the following declaration '{declaration}' and that does {task}.  
 - Infer the language from the file extension: '{ext}'.  
 - All interfaces & types must be declared.
 - Add minimal documentation in tsdoc notation.
 - The function must be exported.
 - You may create utility functions, if the function becomes too big, that are not exported.
 - Remove redundancy.
 - You have the following preferences: '{preferences}'
 Do not generate anything else.`,
);

const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  maxTokens: -1,
});

const chain = sourceCodeImplementationPrompt
  .pipe(model)
  .pipe(new StringOutputParser());
//.pipe(interpreter);

type SourceCodeEntry = Parameters<typeof chain.invoke>[0];

export const entry: TaskSchema = {
  id: "getCharacterByName",
  task: "fetch a character from the star wars api",
  ext: "ts",
  declaration:
    "async function getCharacterByName(name:string):Promise<StarWarsCharacterDetails>",
  preferences: "use fetch",
} satisfies SourceCodeEntry;

//   {
//     ext:"typescript",
//     declaration:"async function getStarWarsCharacter(name:string):Promise<StarWarsCharacter>",
//     task: `fetch a character from the star wars api`,
//   }

const result = await chain.invoke(entry as SourceCodeEntry);

console.log(result);
