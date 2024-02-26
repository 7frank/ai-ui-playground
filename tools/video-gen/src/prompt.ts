import { generateScreenplayPrompt } from "./generateScreenplayPrompt";

if (!process.env.OPENAI_API_KEY) {
  console.error("missing OPENAI_API_KEY");
  process.exit(1);
}

// Example usage
const r=await generateScreenplayPrompt({
  episodeTitle: "The Mystery of the Wilting Garden",
  sceneContext:
    "Mimi and Lulu discover a section of the garden that's wilting and must investigate the cause.",
}).catch(console.error);

console.log(JSON.stringify(r,null,'  '))


