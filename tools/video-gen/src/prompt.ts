import { generateScreenplayPrompt } from "./generateScreenplayPrompt";

if (!process.env.OPENAI_API_KEY) {
  console.error("missing OPENAI_API_KEY");
  process.exit(1);
}

// Example usage
const r = await generateScreenplayPrompt({
  episodeTitle: "The Mystery of the Wilting Garden",
  sceneContext:
    " Mimi and Lulu discover a part of the garden that's wilting and must figure out the cause. Their investigation reveals a blocked underground spring, essential for the garden's health. The episode should highlight themes of problem-solving, the importance of water in ecosystems, and the mother-daughter bond.",
}).catch(console.error);

console.log(JSON.stringify(r, null, "  "));
