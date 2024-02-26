import { OpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {
  StringOutputParser,
  JsonOutputParser,
} from "@langchain/core/output_parsers";
import { getFirstCodeBlock } from "./extractContent";
import { OpenAIChatApi } from "llm-api";
import { completion } from "zod-gpt";
import { PromptSchema, ScreenplaySchema } from "./PromptSchema";

export async function generateScreenplayPrompt(entry: PromptSchema) {
  const episodePrompt = ChatPromptTemplate.fromTemplate<PromptSchema>(
    `Generate a screenplay scene for an episode titled "{{episodeTitle}}" with the following context: {{sceneContext}}. The scene should include dialogues with specified moods for the characters, actions, and a narrator's exposition.`
  );

  // // Assume OpenAI setup here, similar to the previous example
  // const openAI = new OpenAI({
  //     openAIApiKey: process.env.OPENAI_API_KEY,
  //     modelName: "gpt-3.5-turbo",
  //   });
  //   const chain = episodePrompt
  //     .pipe(openAI)
  //     .pipe(new StringOutputParser())
  //     .pipe(getFirstCodeBlock);
  //  // new JsonOutputParser<ScreenplaySchema>()
  //   const episode = await chain.invoke(entry);
  const prompt = await episodePrompt.format(entry);

  const openai = new OpenAIChatApi(
    { apiKey: process.env.OPENAI_API_KEY },
    { model: "gpt-3.5-turbo" }
  );

  const episode = await completion(openai, prompt, {
    schema: ScreenplaySchema,
  });

  return { episode };
}
