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

const entry: TaskSchema = {
  id: fnName,
  task: prompt,
  ext: "ts",
  declaration: decl,
};

const initialParams = {
  prompt: entry.task,
  history: [] as ChatRequestMessage[],
};

createAdaptableCircuitBreaker({
  initialParams,
  retryParamsCallback: (params, lastResponse, error) => {
    console.log("retryParamsCallback:", error.message);
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
      systemMessage: "",
    });
    setLastResponse(res.data);

    const l = res.data.language.trim().toLocaleLowerCase();
    if (l == "ts" || l == "typescript") {
      checkTypescriptSyntax(res.data.sourceCode);

      const name = extractFunctionName(res.data.sourceCode);
      console.log("extracted function name:", name);
      if (entry.id != name)
        throw new Error("function must be named:" + entry.id);

      // checkCodeForFunctionsAndExports(res.data.sourceCode)
      const unspecifiedTypes2 = checkForUnspecifiedTypes(res.data.sourceCode);
      if (unspecifiedTypes2.length)
        throw new Error(
          `'sourceCode' - missing type declaration for:'${unspecifiedTypes2.join(",")}' add it. You MUST return the previous source code with the error fixed. Don't abbreviate. Don't rename variables or types without a reason.`,
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

// FIXME most of the checks are not working .. create isolated test for each and only then add them here

// if (res.data.typeDeclaration.trim() == "")
//   throw new Error(
//     "'typeDeclaration' must be a function and may not be empty",
//   );
// if (res.data.sourceCode.trim() == "")
//   throw new Error("'sourceCode' may not be empty");

// checkTypescriptSyntax(res.data.typeDeclaration);
// const unspecifiedTypes1 = checkForUnspecifiedTypes(
//   res.data.typeDeclaration,
// );
// if (unspecifiedTypes1.length)
//   throw new Error(
//     "'typeDeclaration' - missing type declaration for:" +
//       unspecifiedTypes1.join(","),
//   );
