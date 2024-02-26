import { OpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser,JsonOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";
import { getFirstCodeBlock } from "./extractContent";

// Assume OpenAI setup here, similar to the previous example
const openAI = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-3.5-turbo",
});

async function generateScreenplayPrompt(entry: PromptSchema) {
  const episodePrompt = ChatPromptTemplate.fromTemplate<PromptSchema>(
    `Generate a screenplay scene for an episode titled "{{episodeTitle}}" with the following context: {{sceneContext}}. The scene should include dialogues with specified moods for the characters, actions, and a narrator's exposition.`
  );

  const chain = episodePrompt
    .pipe(openAI)
    .pipe(new StringOutputParser())
    .pipe(getFirstCodeBlock);

  new JsonOutputParser<ScreenplaySchema>()


  const episode = await chain.invoke(entry);

  return {episode};
}

// Example usage
generateScreenplayPrompt({
  episodeTitle: "The Mystery of the Wilting Garden",
  sceneContext:
    "Mimi and Lulu discover a section of the garden that's wilting and must investigate the cause.",
}).catch(console.error);


// ------------------------

const PromptSchema = z.object({
  episodeTitle: z.string(),
  sceneContext: z.string(),
});

type PromptSchema = z.infer<typeof PromptSchema>;

// ------------------------

const dialogueSchema = z.object({
  character: z.string().describe("The name of the character speaking."),
  lines: z
    .array(z.string())
    .describe("The dialogue lines spoken by the character."),
  mood: z
    .string()
    .optional()
    .describe("The mood of the character while speaking."),
});

const sceneSchema = z.object({
  location: z.string().describe("The location where the scene takes place."),
  timeOfDay: z.string().describe("The time of day when the scene occurs."),
  actions: z
    .array(z.string())
    .describe("Descriptions of actions happening in the scene."),
  dialogues: z
    .array(dialogueSchema)
    .describe("Dialogues between characters within the scene."),
  narration: z
    .string()
    .optional()
    .describe(
      "Narrator's voice-over providing additional context or transitions."
    ),
  transitions: z
    .string()
    .optional()
    .describe("Scene transition instructions, e.g., CUT TO, FADE OUT."),
});

const episodeSchema = z.object({
  title: z.string().describe("The title of the episode."),
  scenes: z
    .array(sceneSchema)
    .describe("A collection of scenes that make up an episode."),
});

const ScreenplaySchema = z.object({
  title: z.string().describe("The title of the screenplay."),
  writtenBy: z.string().describe("The author of the screenplay."),
  basedOn: z
    .string()
    .describe(
      "The original work or concept the screenplay is based on, if any."
    ),
  episodes: z
    .array(episodeSchema)
    .describe("An array of episodes comprising the screenplay."),
});


type ScreenplaySchema= z.infer<typeof ScreenplaySchema>