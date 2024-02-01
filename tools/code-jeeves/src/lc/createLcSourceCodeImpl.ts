import { OpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { FunctionResponseSchema, TaskSchema } from "../types/taskFileSchema";
import { LangConfig } from "../languageConfigurations";

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

  const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    maxTokens: -1,
  });

  const chain = sourceCodeImplementationPrompt
    .pipe(model)
    .pipe(new StringOutputParser());

  const sourceCode = await chain.invoke(entry);

  return { language: entry.ext!, packages: [], sourceCode: sourceCode };
}

export async function createLcTestCodeImpl(
  entry: TaskSchema,
  langConfig?: LangConfig,
  implementationCode?:string
): Promise<FunctionResponseSchema> {
  const sourceCodeImplementationPrompt =
    ChatPromptTemplate.fromTemplate<TaskSchema>(
      `Generate source code with at least 3 meaningful tests that test the following declaration '{declaration}'.
         - The purpose of the function itself is '{task}'.  
         - Infer the language from the file extension: '{ext}'.  
         
         - The function must be imported from  ./'{id}.{ext}'.
         
         - You may create utility functions, if the function becomes too big, that are not exported.
         - Remove redundancy.
         - You have the following preferences: '{preferences}'

         Do not generate anything else.
         
         ${implementationCode?"The implementation for which you write the tests is the following:```\n"+implementationCode+"\n```":""}
         `,
    );

  const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    maxTokens: -1,
  });

  const chain = sourceCodeImplementationPrompt
    .pipe(model)
    .pipe(new StringOutputParser());

  // TODO this should come from lang config
  const preferences =
    "use jest, Use 'falso' for generating random values (never use faker for that matter ),BDD for naming 'describe' and 'it' blocks, the Arrange-act-Assert Pattern";

  const sourceCode = await chain.invoke({ ...entry, preferences: preferences });

  return { language: entry.ext!, packages: [], sourceCode: sourceCode };
}
