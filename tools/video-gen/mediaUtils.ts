import { $, file } from "bun";
import { writeFile } from "fs/promises";
import path from "node:path";
// @ts-ignore
import videoshow from "videoshow";

export async function convertTextToSpeech(
  text: string,
  outFile = "audio.wav"
): Promise<string> {
  const baseUrl = "http://localhost:5002/api/tts";
  const encoded = encodeURIComponent(text);
  const url = `${baseUrl}?text=${encoded}&speaker_id=p364&style_wav=&language_id=en`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }

  // Assuming the response is a Buffer
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await writeFile(outFile, buffer);

  return outFile;
}

export async function createVideoWithThumbnail({
  imagePattern,
  audioFile,
  outDir,
  ambientAudioFile = "assets/ambient/birds-chirping.mp3",
}: {
  imagePattern: string;
  audioFile: string;
  outDir: string;
  ambientAudioFile?: string;
}) {
  const slideshow = path.resolve(outDir, "_slideshow.mp4");

  const ffProbeResult =
    await $`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ${audioFile}`.text();
  const audioDurationInSeconds = parseInt(ffProbeResult);

  // Note: bun seems to not have properly working shell pattern "?".
  //   Therefore for all intents and purposes we will resort to "*".
  const searchPattern = imagePattern.replace("%03d", "***");

  if (!(await file(slideshow).exists())) {
    await generateSlideShowWithCrossFade(
      searchPattern,
      audioDurationInSeconds,
      imagePattern,
      slideshow
    );
    console.log("generated image slideshow" + slideshow);
  } else {
    console.log(
      "Skipping generating image slideshow, file exists:" + slideshow
    );
  }

  const resultMp4 = path.resolve(outDir, "result.mp4");
  //-stream_loop -1 -i ${ambientAudioFile}
  if (!(await file(resultMp4).exists())) {
    await $`ffmpeg -i ${slideshow} -stream_loop -1 -i ${ambientAudioFile} -i ${audioFile} -filter_complex "[1:a][2:a]amerge=inputs=2[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -shortest ${resultMp4}
    `;
    console.log("generated result" + resultMp4);
  } else {
    console.log("Skipping generating result, file exists:" + resultMp4);
  }
}

async function generateSlideShow(
  searchPattern: string,
  audioDurationInSeconds: number,
  imagePattern: string,
  outputFile: string
) {
  const lsResult = await $`ls ${searchPattern} | wc -l`.text();
  const imageCount = parseInt(lsResult);

  if (imageCount <= 1) {
    console.error("there must be at least one image for the video encoding");
    process.exit(1);
  }

  const fps = 20;

  await $`ffmpeg -framerate 1/${
    audioDurationInSeconds / imageCount
  } -i ${imagePattern} -c:v libx264 -r ${fps} -pix_fmt yuv420p ${outputFile}`;
}

async function generateSlideShowWithCrossFade(
  searchPattern: string,
  audioDurationInSeconds: number,
  imagePattern: string,
  outputFile: string
) {
  const crossfade = 0.9;
  const fps = 20;

  const directory = path.dirname(searchPattern);
  const filePattern = path.basename(searchPattern);

  let images = (
    await $`find ${directory} -maxdepth 4 -type f  -name '${filePattern}'`.text()
  )
    .trim()
    .split("\n");

  const imageCount = images.length;

  if (imageCount <= 1) {
    console.error("there must be at least one image for the video encoding");
    process.exit(1);
  }

  var videoOptions = {
    fps,
    loop: audioDurationInSeconds / imageCount, // seconds each image is visible
    transition: true,
    transitionDuration: 1, // seconds
    videoBitrate: 1024,
    videoCodec: "libx264",
    size: "640x?",
    audioBitrate: "128k",
    audioChannels: 2,
    format: "mp4",
    pixelFormat: "yuv420p",
  };
  return new Promise<void>((resolve, reject) => {
    videoshow(images, videoOptions)
      // .audio('song.mp3')
      .save(outputFile)
      .on("start", function (command) {
        console.error("ffmpeg process started:", command);
      })
      .on("error", function (err, stdout, stderr) {
        reject(err + stderr);
      })
      .on("end", function (output) {
        console.error("Video created in:", output);
        resolve();
      });
  });
}
