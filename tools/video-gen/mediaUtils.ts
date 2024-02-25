import { $, file } from "bun";
import { writeFile } from "fs/promises";
import path from "node:path";

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
}: {
  imagePattern: string;
  audioFile: string;
  outDir: string;
}) {
  const slideshow = path.resolve(outDir, "_slideshow.mp4");

  const ffProbeResult =
    await $`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ${audioFile}`.text();
  const audioDurationInSeconds = parseInt(ffProbeResult);

  const searchPattern = imagePattern.replace("%03d", "???");

  // FIXME ls not working in here?
  const lsResult = await $`ls ${searchPattern} | wc -l`.text();

  const imageCount = parseInt(lsResult);

  if (imageCount<=1) {console.error("there must be at least one image for the video encoding"); process.exit(1)}

  const fps = 10;



  if (!(await file(slideshow).exists())) {
    await $`ffmpeg -framerate 1/${
      audioDurationInSeconds / imageCount
    } -i ${imagePattern} -c:v libx264 -r ${fps} -pix_fmt yuv420p ${slideshow}`;

    console.log("generated image slideshow" + slideshow);
  } else {
    console.log(
      "Skipping generating image slideshow, file exists:" + slideshow
    );
  }

  const resultMp4 = path.resolve(outDir, "result.mp4");

  if (!(await file(resultMp4).exists())) {
    await $`ffmpeg -i ${slideshow} -i ${audioFile} -c:v copy -c:a aac -shortest ${resultMp4}`;
    console.log("generated result" + resultMp4);
  } else {
    console.log("Skipping generating result, file exists:" + resultMp4);
  }
}
