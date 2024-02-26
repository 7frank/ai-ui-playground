import { $, file } from "bun";
import { ScreenplaySchema } from "./PromptSchema";
import { convertTextToSpeech } from "../mediaUtils";
import path from "node:path";

// TODO add this when the narrator is speaking only
//   const heSaidSheSaid =
//     Math.random() < 0.2
//       ? " " +
//         speaker.character +
//         " " +
//         getSynonymForSaidByMood(speaker.mood ?? mood ?? "")
//       : "";

const res = await $`cat assets/Arc/S1E1.screenplay.json`.json();

const episode = ScreenplaySchema.parse(res);

const res2 = await Promise.allSettled(
  episode.episode.scenes.map(
    (
      { dialogues, location, timeOfDay, actions, narration, transitions },
      sceneId
    ) => {
      // TODO narrator from  location, timeOfDay, actions, narration, transitions

      const dialogs = dialogues.map(async (speaker, id) => {
        const paddedSceneId = sceneId.toString().padStart(3, "0");
        const paddedNarratorId = id.toString().padStart(3, "0");
        const paddedId = (id + 1).toString().padStart(3, "0");

        const targetFolder = path.resolve(`.out/S1E1/`);
        await $`mkdir -p ${targetFolder}`;

        const voices = { narrator: "p292", mimi: "p364", lulu: "p297" };

        const narratorAudioFile = path.resolve(
          targetFolder,
          `${paddedSceneId}_${paddedNarratorId}.wav`
        );

        const narratorText = narration??"" + " " + actions.join(" ");
        console.log("narrator", narratorText);

        await doSpeak(narratorAudioFile, narratorText, voices.narrator).catch(e=> console.error(e.message));

        const audioFile = path.resolve(
          targetFolder,
          `${paddedSceneId}_${paddedId}.wav`
        );

        const selectedVoice = voices[speaker.character.toLowerCase()];
        const { text, mood } = extractMoodAndText(speaker.lines.join(""));
        console.log(speaker.character, speaker.mood, mood, text);

        await doSpeak(audioFile, text, selectedVoice);

        return { audioFile: audioFile };
      });

      return Promise.allSettled(dialogs);
    }
  )
);

// TODO error messages arent serialized
console.log(JSON.stringify(res2, null, "  "));

async function doSpeak(audioFile: string, text: string, selectedVoice: string) {
  if (!(await file(audioFile).exists())) {
    await convertTextToSpeech(text, audioFile, selectedVoice);
    console.log("converted TextToSpeech Result:" + audioFile);
  } else {
    console.log("Skipping convertTextToSpeech, file exists:" + audioFile);
  }
}

function extractMoodAndText(input: string): {
  mood: string | null;
  text: string;
} {
  // Regular expression to match the mood at the beginning of the string
  // It looks for an optional group of characters inside parentheses at the start
  const regex = /^\(([^)]+)\)\s*(.*)/;
  const matches = input.match(regex);

  if (matches && matches.length > 2) {
    // If there's a match, return the mood and the rest of the text
    return { mood: matches[1], text: matches[2] };
  } else {
    // If there's no mood, return null for mood and the original input as text
    return { mood: null, text: input };
  }
}

function getSynonymForSaidByMood(mood: string): string {
  // Define synonyms categorized by mood
  const synonyms: { [key: string]: string[] } = {
    neutral: [
      "remarked",
      "stated",
      "mentioned",
      "commented",
      "noted",
      "observed",
    ],
    authority: ["declared", "asserted", "proclaimed", "announced", "affirmed"],
    questioning: ["asked", "inquired", "questioned", "wondered", "pondered"],
    softness: ["whispered", "murmured", "mumbled", "muttered", "breathed"],
    loud: ["shouted", "yelled", "bellowed", "exclaimed", "cried"],
    emotional: ["laughed", "sobbed", "moaned", "cheered", "jeered", "scoffed"],
    conversational: [
      "replied",
      "responded",
      "retorted",
      "countered",
      "rejoined",
    ],
    manner: ["quipped", "teased", "jested", "boasted", "lied"],
    explanatory: ["explained", "described", "detailed", "reported", "narrated"],
    secretive: ["confided", "disclosed", "revealed", "admitted"],
  };

  // Mood to category mapping (simplified and not exhaustive)
  const moodMapping: { [key: string]: string } = {
    angry: "loud",
    happy: "emotional",
    sad: "softness",
    curious: "questioning",
    authoritative: "authority",
    quiet: "softness",
    loud: "loud",
    whispering: "softness",
    excited: "loud",
    emotional: "emotional",
    neutral: "neutral",
    explaining: "explanatory",
    secretive: "secretive",
  };

  // Default category if the mood doesn't match exactly
  const defaultCategory = "neutral";

  // Find the closest mood category
  const category = moodMapping[mood.toLowerCase()] || defaultCategory;

  // Choose a random synonym from the category
  const synonymsForMood = synonyms[category];
  return synonymsForMood[Math.floor(Math.random() * synonymsForMood.length)];
}
