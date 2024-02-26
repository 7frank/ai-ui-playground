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
    `
Generate a screenplay scene for an episode titled "{{episodeTitle}}". The scene should include dialogues with specified moods for the characters, actions, and a narrator's exposition. 
    
**Context:**
We are in Season 1 of "The Adventures of Mimi and Lulu: The Garden of Beginnings," focusing on discovery and friendship. Mimi, a curious girl with the ability to transform into a snail, and her mother, Lulu, explore their enchanted garden home, learning about the ecosystem and helping their fellow inhabitants. This season establishes the world and characters, setting the stage for Mimi's development and adventures.

**Overarching Plot:**
Throughout this season, Mimi and Lulu discover a mysterious seed that leads them on a journey to understand the importance of every creature in the garden. Their adventures teach them about teamwork, the cycles of nature, and the value of curiosity. By the season's end, they face a challenge that tests the resilience of the garden and their own courage.

**Episode Brief:**
Create an episode where: {{sceneContext}}

**Special Notes:**
- Incorporate educational elements about water conservation and ecosystems naturally into the dialogue and plot.
- Emphasize Mimi's unique perspective when she's in her snail form to solve parts of the mystery.
- Include a subplot where Lulu teaches Mimi a related garden lore or wisdom that helps resolve the episode's main conflict.

**Objective:**
The screenplay should culminate in Mimi and Lulu successfully unblocking the spring, revitalizing the garden. The episode closes with the garden in full bloom, celebrating the balance of nature and the small yet significant victories of Mimi and Lulu's adventures.


**Addtionally**
 - Give the actors more to say
 - Also add a narrator that handles exposition
    
`);

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

  return episode.data??episode as unknown as ScreenplaySchema ;
}
