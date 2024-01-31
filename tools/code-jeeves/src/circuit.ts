import { askOpenApiStructured, askOpenApiStructured2 } from "./askOpenAI";
import { zodRefineTypescript } from "./subcommands/plan/zodRefineTypescript";
import { FunctionResponseSchema } from "./types/taskFileSchema";
import { CompletionApi, ChatRequestMessage } from "llm-api";

interface AdaptableCircuitBreaker<T, U> {
  initialParams: T;
  retryParamsCallback: (params: T, lastResponse: U, error: Error) => T;
  fn: (params: T, setLastResponse: (val: U) => void) => Promise<U>;
  maxRetries?: number;
  timeout?: number; // Timeout in milliseconds
}

async function callOpenAIWithRetry<T, U>({
  initialParams,
  retryParamsCallback,
  fn,
  maxRetries = 5,
  timeout = 10000,
}: AdaptableCircuitBreaker<T, U>): Promise<U> {
  let currentParams = initialParams;
  let startTime = Date.now();

  for (let i = 0; i < maxRetries; i++) {
    if (Date.now() - startTime > timeout) {
      throw new Error("Operation timed out");
    }

    let lastSyntacticallyCorrectResponse: U = undefined as U;
    try {
      console.log(`${i}th try with params`, currentParams);
      const response = await fn(currentParams, (val) => {
        lastSyntacticallyCorrectResponse = val;
      });
      return response;
    } catch (error) {
      console.error("Error during callback execution: ", error);
      currentParams = retryParamsCallback(
        currentParams,
        lastSyntacticallyCorrectResponse,
        error as Error,
      );
    }
  }
  throw new Error("Max retries reached with no valid response");
}

const prompt = `create a function that 'queries the star wars api and returns a character by name'.
Use typescript.
The interface of the function looks the following 'async function(name:String)' 
`;
// Usage example
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

    await zodRefineTypescript(res.data.typeDeclaration);

    // TODO syntax check
    //res.typeDeclaration
    //res.sourceCode
    return res;
  },
})
  .then((response) => console.log("Success:", response))
  .catch((error) => console.error("Failed:", error));
