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
import { entry } from "./prompt";
import { LangConfig } from "./languageConfigurations";

/******************************** */

export function runImplementationTypescriptChecks(
  data: FunctionResponseSchema,
) {
  /**
   * @deprecated since 24/2, might be no longer necessary because we fixed the bugs in the validation step that irritated gpt.
   */
  const constraints =
    "You MUST return the previous source code with the error fixed. Don't abbreviate. Don't rename variables or types without a reason.";

  checkTypescriptSyntax(data.sourceCode);

  if (data.sourceCode.trim() == "")
    throw new Error("'sourceCode' may not be empty");

  const name = extractFunctionName(data.sourceCode);
  console.log("extracted function name:", name);
  if (entry.id != name) throw new Error("function must be named:" + entry.id);

  checkCodeForFunctionsAndExports(data.sourceCode);
  // TODO this somethimes works and sometimes doesnt?
  const unspecifiedTypes2 = checkForUnspecifiedTypes(data.sourceCode);
  if (unspecifiedTypes2.length)
    throw new Error(
      `'sourceCode' - missing type declaration for:'${unspecifiedTypes2.join(",")}' add it. ${constraints}`,
    );
}

export function runTestTypescriptChecks(data: FunctionResponseSchema) {
  /**
   * @deprecated since 24/2, might be no longer necessary because we fixed the bugs in the validation step that irritated gpt.
   */
  const constraints =
    "You MUST return the previous source code with the error fixed. Don't abbreviate. Don't rename variables or types without a reason.";

  checkTypescriptSyntax(data.sourceCode);

  if (data.sourceCode.trim() == "")
    throw new Error("'sourceCode' may not be empty");

  // todo validate import
  //  checkCodeForFunctionsAndExports(data.sourceCode);
  // const unspecifiedTypes2 = checkForUnspecifiedTypes(data.sourceCode);
  // if (unspecifiedTypes2.length)
  //   throw new Error(
  //     `'sourceCode' - missing type declaration for:'${unspecifiedTypes2.join(",")}' add it. ${constraints}`,
  //   );
}

export function createImplementationSourceCodeFromTask(
  entry: TaskSchema,
  langConfig?: LangConfig,
) {
  const systemMessage = `You are a 10x Software developer.
  You will be asked to create source code. 
  You will do so and think step by step.
  If you come upon unspecified types you infer them to the best of your knowledge.
  Afterwards you are give error messages directly related to the source code you generated.
  You will fix them.
  You don't rename variables or types without a reason.
  You are not lazy and write full source code.
  When in a longer conversation with the user, you will give full source code.

  Function bodies may not be empty.
  Interfaces may not be empty.
  
 `;

  const prompt = `${entry.task}
  Infer the language from the file extension: 'ts'.
  ${entry.preferences ? entry.preferences : ""}
  The interface of the function looks the following '${entry.declaration}'.
  The function must be exported if possible in the language.
  `;
  const initialParams = {
    history: [] as ChatRequestMessage[],
    prompt,
  };

  return createAdaptableCircuitBreaker<
    typeof initialParams,
    FunctionResponseSchema
  >({
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
        systemMessage,
      });
      setLastResponse(res.data);

      langConfig?.sourceCodeChecksHandler?.(res.data);

      return res.data;
    },
  });
}
/******************************** */

export function createTestSourceCodeFromTask(
  entry: TaskSchema,
  langConfig?: LangConfig,
) {
  const systemMessage = `You are a 10x Software developer.
  You will be asked to create tests. 
  You will do so and think step by step.
  
  Afterwards you are give error messages directly related to the test code you generated.
  You will fix them.
  You don't rename variables or types without a reason.
  You are not lazy and write full source code.
  When in a longer conversation with the user, you will give full source code.
 `;

  const prompt = `You must write tests for certain source code.
  You where previously given a task:"""${entry.task}"""
  For which you now are supposed to write tests.
  Infer the language from the file extension: 'ts'.
  ${entry.preferences ? entry.preferences : ""}
  The interface of the function looks the following '${entry.declaration}'.
  The function must be imported. 
  The function can be found in the same folder as the test.
  The file that contains the function is named like the function itself.
  You MUST at least create one positive and one negative test case.

  For Typescript use "jest". 
  For python use "PyUnit"
  `;

  /**
   * @deprecated since 24/2, might be no longer necessary because we fixed the bugs in the validation step that irritated gpt.
   */
  const constraints =
    "You MUST return the previous source code with the error fixed. Don't abbreviate. Don't rename variables or types without a reason.";

  const initialParams = {
    history: [] as ChatRequestMessage[],
    prompt,
  };

  return createAdaptableCircuitBreaker<
    typeof initialParams,
    FunctionResponseSchema
  >({
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
        systemMessage,
      });
      setLastResponse(res.data);

      langConfig?.testCodeChecksHandler?.(res.data);

      return res.data;
    },
  });
}

export function createTestRunnerFromTask(
  entry: TaskSchema,
  {
    sourceFile,
    testFile,
    testResult,
  }: { sourceFile: string; testFile: string; testResult: string },
  langConfig?: LangConfig,
) {
  const systemMessage = `You are a 10x Software developer.
  You will be asked to fix the implementation of a certain function. 
  You will do so and think step by step.

  
  You will be given the implementation as well as error messages from tests that have been run.
  You will fix them.
  You don't rename variables or types without a reason.
  You are not lazy and write full source code.
  When in a longer conversation with the user, you will give full source code.
 `;

  const prompt = `The test results contained errors: Fix the implementation:${testResult}`;

  const initialParams = {
    history: [
      { role: "user", content: sourceFile },
      { role: "user", content: testFile },
    ] as ChatRequestMessage[],
    prompt,
  };

  return createAdaptableCircuitBreaker<
    typeof initialParams,
    FunctionResponseSchema
  >({
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
        systemMessage,
      });
      setLastResponse(res.data);

      langConfig?.testCodeChecksHandler?.(res.data);

      return res.data;
    },
  });
}
