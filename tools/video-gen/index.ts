import { binary, command, option, run, string } from "cmd-ts";
import {
  convertTextToSpeech,
  createVideoWithThumbnail,
} from "./src/mediaUtils"; // Sie müssen diese Funktionen basierend auf den folgenden Beschreibungen implementieren.
import fs from "node:fs";
import path from "node:path";
import { $, file } from "bun";

const app = command({
  name: "createStoryVideo",
  args: {
    text: option({
      type: string,
      long: "text",
      description: "Der Text der Geschichte",
    }),
    imagePath: option({
      type: string,
      long: "imagePath",
      description: "a ffmpeg conform image path e.g. '.foo/barimg%03d.jpg'",
    }),
    outDir: option({
      type: string,
      long: "outDir",
      short: "o",
      description: "Der Pfad für das Ergebniss",
    }),
  },
  handler: async ({ text, imagePath: imagePattern, outDir }) => {
    const targetFolder = path.resolve(outDir);
    const audioFile = path.resolve(targetFolder, "result.wav");

    // Note: for now we assume that the result.wav exists ans search for it if no text is specifiec
    //   TODO change this approach

    if (!!text) {
      if (fs.existsSync(text)) {
        text = await $`cat ${text}`.text();
      }

      await $`mkdir -p ${targetFolder}`;
      if (!(await file(audioFile).exists())) {
        await convertTextToSpeech(text, audioFile);
        console.log("converted TextToSpeech Result:" + audioFile);
      } else {
        console.log("Skipping convertTextToSpeech, file exists:" + audioFile);
      }
    } else {
      console.log("no text provided assuming file exists", audioFile);
    }

    if (!imagePattern) {
      console.log(
        "specify an imagePath if you want to convert the audio to video"
      );
    }

    await createVideoWithThumbnail({
      imagePattern,
      audioFile,
      outDir,
    });
  },
});

run(binary(app), process.argv);
