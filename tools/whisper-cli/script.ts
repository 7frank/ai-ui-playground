// Assuming Bun is used, which has native support for fetch and FormData
import { $ } from "bun";
// Replace with the path to your audio file
const AUDIO_FILE_PATH = "/tmp/output_file.wav";

async function convertAudioToText(audioFilePath: string) {
  // Path to your audio file

  const f = await $`cat ${audioFilePath}`.blob();

  const formData = new FormData();
  formData.append("audio_file", f, "output_file.wav");


  const p: Record<string, boolean | string | number> = {
    encode: true,
    task: "transcribe",
    language: "en",
    word_timestamps: false,
    output: "txt",
  };
  const queryParams = new URLSearchParams(p as any).toString();

  const WHISPER_ASR_URL = `http://localhost:9000/asr?${queryParams}`;

  try {
    const response = await fetch(WHISPER_ASR_URL, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const result = await response.text();
    console.log("", result);
  } catch (error) {
   throw error
  }
}

convertAudioToText(AUDIO_FILE_PATH);
