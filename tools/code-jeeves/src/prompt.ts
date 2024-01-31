import { askOpenApiStructured2 } from "./askOpenAI";
import { FunctionResponseSchema } from "./types/taskFileSchema";
import { ChatRequestMessage } from "llm-api";
import {
  callOpenAIWithRetry,
  checkForUnspecifiedTypes,
  checkTypescriptSyntax,
} from "./circuit-breaker";

const prompt = `create a function that 'queries the star wars api and returns a character by name'.
Use typescript.
use fetch.
The interface of the function looks the following 'async function(name:String):Promise<StarWarsCharacterDetails>' 
`;

const initialParams = {
  prompt: prompt,
  history: [] as ChatRequestMessage[],
};

callOpenAIWithRetry({
  initialParams,
  retryParamsCallback: (params, lastResponse, error) => {
    console.log("retryParamsCallback:", error.message);
    params.history.push({ role: "user", content: params.prompt });
    params.history.push({
      role: "assistant",
      content: JSON.stringify(lastResponse),
    });

    return { ...params, prompt: "Error" + error.message };
  },
  fn: async (params, setLastResponse) => {
    const res = await askOpenApiStructured2(params.prompt, {
      schema: FunctionResponseSchema,
      messageHistory: [],
      systemMessage: "",
    });
    setLastResponse(res);

    const l = res.data.language.trim().toLocaleLowerCase();
    if (l == "ts" || l == "typescript") {
      if (res.data.typeDeclaration.trim() == "")
        throw new Error(
          "'typeDeclaration' must be a function and may not be empty",
        );
      if (res.data.sourceCode.trim() == "")
        throw new Error("'sourceCode' may not be empty");


      // Check the syntax of the code snippet
      checkTypescriptSyntax(res.data.typeDeclaration);
      const unspecifiedTypes1 = checkForUnspecifiedTypes(
        res.data.typeDeclaration,
      );
      if (unspecifiedTypes1.length)
        throw new Error(
          "'typeDeclaration' - missing type declaration for:" +
            unspecifiedTypes1.join(","),
        );

      checkTypescriptSyntax(res.data.sourceCode);
      const unspecifiedTypes2 = checkForUnspecifiedTypes(res.data.sourceCode);
      if (unspecifiedTypes2.length)
        throw new Error(
          "'sourceCode' - missing type declaration for:" +
            unspecifiedTypes2.join(","),
        );
    }

    return res;
  },
})
  .then((response) => console.log("Success:", response))
  .catch((error) => console.error("Failed:", error));
