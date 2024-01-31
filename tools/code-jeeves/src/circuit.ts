import { z } from 'zod';
import { askOpenApiStructured } from './askOpenAI';
import { FunctionResponseSchema } from './types/taskFileSchema';



async function callOpenAIWithRetry<T, U>(
    initialParams: T,
    retryParamsCallback: (params: T, error: Error | null) => T,
    fn: (params: T) => Promise<U>,
    maxRetries: number = 5,
    timeout: number = 10000 // Timeout in milliseconds
): Promise<U> {
    let currentParams = initialParams;
    let startTime = Date.now();

    for (let i = 0; i < maxRetries; i++) {
        if (Date.now() - startTime > timeout) {
            throw new Error("Operation timed out");
        }

        try {
            const response = await fn(currentParams);
        } catch (error) {
            console.error("Error during callback execution: ", error);
            currentParams = retryParamsCallback(currentParams, error as Error);
        }
    }
    throw new Error("Max retries reached with no valid response");
}


const prompt=
`create a function that 'queries the star wars api and returns a character by name'.
Use typescript.
The interface of the function looks the following 'async function(name:String)' 
`
// Usage example
const initialParams = {
    prompt: prompt,
    otherParam: 123 // Example of additional parameter
};



callOpenAIWithRetry(initialParams,  (params, error) => {
    return { ...params, prompt: "New Prompt based on error" };
}, async (params) => {
    const res=await askOpenApiStructured("",params.prompt,FunctionResponseSchema);

  // TODO syntax check
  //res.typeDeclaration
  //res.sourceCode
    return res
})
    .then(response => console.log("Success:", response))
    .catch(error => console.error("Failed:", error));
