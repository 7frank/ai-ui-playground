import { $, file } from "bun";
import { ScreenplaySchema } from "./PromptSchema";
import { convertTextToSpeech } from "./mediaUtils";
import path from "node:path";
import { extractMoodAndText } from "./extractMoodAndText";

const res = await $`cat assets/Arc/S1E1.screenplay.json`.json();

const episode = ScreenplaySchema.parse(res);

const res2 = await createEpisodeAudioChunks(episode);

// TODO error messages arent serialized
//console.log(JSON.stringify(res2, null, "  "));

const files = await find(".out/S1E1", "*_*.wav");

const fileList = files
  .sort()
  .map((it) => `-i ${it}`)
  .join(" ");

// TODO continue with sox but that fails with bun ..
console.error(fileList)

async function find(directory: string, filePattern: string) {
  let files =
    await $`find ${directory} -maxdepth 4 -type f  -name '${filePattern}'`.text();

  return files.trim().split("\n");
}

async function createEpisodeAudioChunks(episode: ScreenplaySchema) {
  return await Promise.allSettled(
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

          const narratorText = narration ?? "" + " " + actions.join(" ");
          console.log("narrator", narratorText);

          await doSpeak(narratorAudioFile, narratorText, voices.narrator).catch(
            (e) => console.error(e.message)
          );

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
}

async function doSpeak(audioFile: string, text: string, selectedVoice: string) {
  if (!(await file(audioFile).exists())) {
    await convertTextToSpeech(text, audioFile, selectedVoice);
    console.log("converted TextToSpeech Result:" + audioFile);
  } else {
    console.log("Skipping convertTextToSpeech, file exists:" + audioFile);
  }
}
