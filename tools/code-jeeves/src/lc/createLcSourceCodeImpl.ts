import { OpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { FunctionResponseSchema, TaskSchema } from "../types/taskFileSchema";
import { LangConfig } from "../languageConfigurations";

export async function createLcSourceCodeImpl(
  entry: TaskSchema,
  langConfig?: LangConfig,
):Promise<FunctionResponseSchema> {
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

  return {language:entry.ext!,packages:[],sourceCode:sourceCode};
}
