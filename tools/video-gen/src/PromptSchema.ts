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
    episodes: z
        .array(episodeSchema)
        .describe("An array of episodes comprising the screenplay."),
});
export type ScreenplaySchema = z.infer<typeof ScreenplaySchema>;
