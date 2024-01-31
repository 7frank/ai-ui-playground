import { askOpenApiStructured } from "./askOpenAI";
import { FunctionResponseSchema } from "./types/taskFileSchema";

interface AdaptableCircuitBreaker<T, U> {
  initialParams: T;
  retryParamsCallback: (params: T, error: Error | null) => T;
  fn: (params: T) => Promise<U>;
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

    try {
      const response = await fn(currentParams);
      return response;
    } catch (error) {
      console.error("Error during callback execution: ", error);
      currentParams = retryParamsCallback(currentParams, error as Error);
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
  otherParam: 123, // Example of additional parameter
};

callOpenAIWithRetry({
  initialParams,
  retryParamsCallback: (params, error) => {
    return { ...params, prompt: "New Prompt based on error" };
  },
  fn: async (params) => {
    const res = await askOpenApiStructured(
      "",
      params.prompt,
      FunctionResponseSchema,
    );
    // TODO syntax check
    //res.typeDeclaration
    //res.sourceCode
    return res;
  },
})
  .then((response) => console.log("Success:", response))
  .catch((error) => console.error("Failed:", error));
