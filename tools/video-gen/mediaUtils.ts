import { writeFile } from 'fs/promises';
export async function convertTextToSpeech(text: string, outFile = "audio.wav"): Promise<string> {
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

export async function createVideoWithThumbnail(
  imagePath: string,
  audioPath: string
) {}




