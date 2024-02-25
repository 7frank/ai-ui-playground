import { $ } from "bun";

export async function convertTextToSpeech(text: string,outFile = "audio.wav") {
  const baseUrl = "http://localhost:5002/api/tts";
  const encoded = encodeURIComponent(text);


  await $`curl -o ${outFile} \`${baseUrl}?text=${encoded}&speaker_id=p364&style_wav=&language_id=en\` `;
  return outFile;
}

export async function createVideoWithThumbnail(
  imagePath: string,
  audioPath: string
) {}




