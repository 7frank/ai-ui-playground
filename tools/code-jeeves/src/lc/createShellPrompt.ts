import { OpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { FunctionResponseSchema, TaskSchema } from "../types/taskFileSchema";
import { LangConfig } from "../languageConfigurations";
import { getModelsConfig, availableModels } from "../models";
import { getFirstCodeBlock } from "../preprocess/extractContent";

const mConfig = getModelsConfig();

const lcScModel = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  maxTokens: -1,

  modelName: mConfig.shell.model,
});

export async function createShellPrompt(question: string): Promise<string> {
  const shellPrompt = ChatPromptTemplate.fromTemplate<{ task: string }>(
    `Return the shellcommand that is supposed to do the following: {task}.
    - assume the user wants the current directory they are in, if they do not specify it.
    - if you return a markdown code block mark the block with \`\`\`"bash"
       Do not generate anything else.`
  );

  const chain = shellPrompt
    .pipe(lcScModel)
    .pipe(new StringOutputParser())
    .pipe(getFirstCodeBlock);

  const sourceCode = await chain.invoke({ task: question });

  return sourceCode;
}
