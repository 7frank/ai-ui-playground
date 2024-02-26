import { $ } from "bun";
import { ScreenplaySchema } from "./PromptSchema";
import { convertTextToSpeech } from "../mediaUtils";

const res = await $`cat assets/Arc/S1E1.screenplay.json`.json();

const episode = ScreenplaySchema.parse(res);

const res2 = await Promise.all(
  episode.episode.scenes.map(
    (
      { dialogues, location, timeOfDay, actions, narration, transitions },
      sceneId
    ) => {
      // TODO narrator from  location, timeOfDay, actions, narration, transitions

      const dialogs = dialogues.map(async (speaker, id) => {
        const paddedSceneId = sceneId.toString().padStart(3, "0");
        const paddedId = id.toString().padStart(3, "0");

        const fileName = `.out/S1E1/${paddedSceneId}_${paddedId}`;
        try {
          await convertTextToSpeech(speaker.lines.join(""), fileName);
          return { fileName, result: "success" };
        } catch (e) {
          return { fileName, result: "error", error: (e as any).message };
        }
      });

      return dialogs;
    }
  )
);

console.log(res2);
