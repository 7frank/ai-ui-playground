import { z } from "zod";

// ------------------------
export const PromptSchema = z.object({
  episodeTitle: z.string(),
  sceneContext: z.string(),
});
export type PromptSchema = z.infer<typeof PromptSchema>;
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

export const ScreenplaySchema = z.object({
    title: z.string().describe("The title of the screenplay."),
    writtenBy: z.string().describe("The author of the screenplay."),
    basedOn: z
      .string()
      .describe(
        "The original work or concept the screenplay is based on, if any."
      ),
    episode: episodeSchema,
  });

/**
 * **Screenplay Format Instructions:**
 * TODO check what of these should still make it into the model
 * - **Title Page:** Include the episode title, "The Mystery of the Wilting Garden," along with "Written by [Your Name]" and "Based on 'The Adventures of Mimi and Lulu' by [Creator's Name]."
 * - **Scene Headings:** Start with INT. or EXT. (interior or exterior), followed by the location and time of day.
 * - **Action:** Describe what happens in each scene, focusing on visual elements and important actions. Keep descriptions concise and vivid.
 * - **Character Introductions:** When a character is introduced for the first time, provide a brief description.
 * - **Dialogue:** Each line of dialogue should be preceded by the character's name (centered). Include important character reactions or actions in parentheses.
 * - **Transitions:** Indicate scene transitions with terms like CUT TO:, DISSOLVE TO:, or FADE TO: as necessary.
 */


export type ScreenplaySchema = z.infer<typeof ScreenplaySchema>;
