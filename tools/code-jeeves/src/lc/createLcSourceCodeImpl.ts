import { OpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { FunctionResponseSchema, TaskSchema } from "../types/taskFileSchema";
import { LangConfig } from "../languageConfigurations";
import { getModelsConfig } from "../models";

const mConfig = getModelsConfig();

const lcScModel = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  maxTokens: -1,

  modelName: mConfig.sourcecode.model,
});

const lcTcModel = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  maxTokens: -1,

  modelName: mConfig.testcode.model,
});

export async function createLcSourceCodeImpl(
  entry: TaskSchema,
  langConfig?: LangConfig,
): Promise<FunctionResponseSchema> {
  // TODO implement feedback loop similarly {@link(createImplementationSourceCodeFromTask)} to CircuitBreaker and langConfig?.sourceCodeChecksHandler
  // const prompt= ChatPromptTemplate.fromMessages([["system","foo"]])
  // prompt.invoke({})

  const sourceCodeImplementationPrompt =
    ChatPromptTemplate.fromTemplate<TaskSchema>(
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

  const chain = sourceCodeImplementationPrompt
    .pipe(lcScModel)
    .pipe(new StringOutputParser());

  const sourceCode = await chain.invoke(entry);

  return { language: entry.ext!, packages: [], sourceCode: sourceCode };
}

export async function createLcTestCodeImpl(
  entry: TaskSchema,
  langConfig?: LangConfig,
  implementationCode?: string,
): Promise<FunctionResponseSchema> {
  const sourceCodeImplementationPrompt = ChatPromptTemplate.fromTemplate<
    TaskSchema & { optionalSource: string }
  >(
    `Generate source code with at least 3 meaningful tests that test the following declaration '{declaration}'.
         - The purpose of the function itself is '{task}'.  
         - Infer the language from the file extension: '{ext}'.  
         
         - The function must be imported from  ./'{functionName}.{ext}'.
         
         - You may create utility functions, if the function becomes too big, that are not exported.
         - Remove redundancy.
         - You have the following preferences: '{preferences}'
         {optionalSource}
         Do not generate anything else.
         `,
  );

  const chain = sourceCodeImplementationPrompt
    .pipe(lcTcModel)
    .pipe(new StringOutputParser());

  // TODO this should come from lang config
  const preferences = [
    "use jest",
    //"Use 'falso' for generating random values (never use faker for that matter )",
    "BDD for naming 'describe' and 'it' blocks",
    "the Arrange-act-Assert Pattern",
  ];

  const optionalSource = implementationCode
    ? "The implementation for which you write the tests is the following:```\n" +
      implementationCode +
      "\n```"
    : "";

  const sourceCode = await chain.invoke({
    ...entry,
    preferences: preferences.join(","),
    optionalSource,
  });

  return { language: entry.ext!, packages: [], sourceCode: sourceCode };
}
