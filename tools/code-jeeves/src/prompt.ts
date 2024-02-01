import { askOpenApiStructured2 } from "./askOpenAI";
import { FunctionResponseSchema, TaskSchema } from "./types/taskFileSchema";
import { ChatRequestMessage } from "llm-api";
import { createAdaptableCircuitBreaker } from "./circuit-breaker";
import {
  checkCodeForFunctionsAndExports,
  checkForUnspecifiedTypes,
  checkTypescriptSyntax,
  extractFunctionName,
} from "./typescriptTypecheckUtils";

type SupportedLang = "ts" | "py";
type LangConfig = {
  testCommand: `${string} {filename}`;
};

const langRecord: Partial<Record<SupportedLang, LangConfig>> = {
  ts: {
    testCommand: "bun test {filename}",
  },
};

const fnName = "getCharacterByName";
const decl =
  "async function getCharacterByName(name:String):Promise<StarWarsCharacterDetails>";
const prompt = `create a function that 'queries the star wars api and returns a character by name'.
Infer the language from the file extension: 'ts'.
use fetch.
The interface of the function looks the following '${decl}' 
`;

const constraints =
  "You MUST return the previous source code with the error fixed. Don't abbreviate. Don't rename variables or types without a reason.";

const entry: TaskSchema = {
  id: fnName,
  task: prompt,
  ext: "ts",
  declaration: decl,
};

const initialParams = {
  history: [] as ChatRequestMessage[],
  prompt: entry.task,
};

createAdaptableCircuitBreaker({
  initialParams,
  retryParamsCallback: (params, lastResponse, error) => {
    params.history.push({ role: "user", content: params.prompt });

    // in case zod-gpt fails there is no response
    if (lastResponse) {
      params.history.push({
        role: "assistant",
        content: JSON.stringify(lastResponse.sourceCode),
      });
    }

    return {
      ...params,
      prompt: "There was an error in your previous response:" + error.message,
    };
  },
  fn: async (params, setLastResponse) => {
    const res = await askOpenApiStructured2(params.prompt, {
      schema: FunctionResponseSchema,
      messageHistory: [],
      systemMessage: `You are a 10x Software developer.
       You will be asked to create source code. 
       You will do so and think step by step.
       If you come upon unspecified types you infer them to the best of your knowledge.
       Afterwards you are give error messages directly related to the source code you generated.
       You will fix them.
       You don't rename variables or types without a reason.
       You are not lazy and write full source code.
       When in a longer conversation with the user, you will give full source code.
      `,
    });
    setLastResponse(res.data);

    const l = res.data.language.trim().toLocaleLowerCase();

    //  Note maybe alternatively we want to: either test each and then batch return errors or try out catch all and "fix this code it seems not to be working"
    if (l == "ts" || l == "typescript") {
      checkTypescriptSyntax(res.data.sourceCode);

      if (res.data.sourceCode.trim() == "")
        throw new Error("'sourceCode' may not be empty");

      const name = extractFunctionName(res.data.sourceCode);
      console.log("extracted function name:", name);
      if (entry.id != name)
        throw new Error("function must be named:" + entry.id);

      // checkCodeForFunctionsAndExports(res.data.sourceCode)
      const unspecifiedTypes2 = checkForUnspecifiedTypes(res.data.sourceCode);
      if (unspecifiedTypes2.length)
        throw new Error(
          `'sourceCode' - missing type declaration for:'${unspecifiedTypes2.join(",")}' add it. ${constraints}`,
        );
    }

    return res.data;
  },
})
  .then((response) => {
    console.log("Success:");
    console.log(JSON.stringify(response, null, "  "));
  })
  .catch((error) => console.error("Failed:", error));
