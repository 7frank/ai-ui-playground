import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { fileTypeFromBuffer } from "file-type";

import { createHash } from "crypto";
import { $ } from "bun";

if (!process.env["OPENAI_API_KEY"]) throw new Error("missing OPENAI_API_KEY");

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

const mimiDescription = `a small girl named Mimi, who has the enchanting ability to transform into a snail, is depicted mid-transformation. Her human form is adorable, with big, expressive eyes and a joyful smile, while her snail form retains these expressive features, including a colorful, patterned shell. Mimi is wearing a tiny backpack, symbolizing her adventurous spirit.`;
const luluDescription = `Lulu, also with the ability to transform, is shown in her human form, which is kind and loving, with a soft smile and gentle eyes.`;
// const systemPrompt = `Illustrate a scene or characters for a children’s book,  in the "Hayao Miyazaki Art Style", showing a heartwarming moment in a vibrant garden where Mimi, a young girl with the magical ability to transform into a cute snail, and her mother, Lulu, discover a hidden spring obstructed by rocks. Mimi, having transformed into her snail form to get a closer look, is near the blocked spring, while Lulu, in her human form, watches over her with a blend of concern and admiration. The scene captures the lush beauty of their garden home, contrasting with the urgency of their discovery."`;
// const systemPrompt=`In a magical, lush garden, ${mimiDescription} The scene captures the magical moment of transformation, surrounded by vibrant flowers and lush greenery, under a sky painted with hues of gold and purple from the setting sun, creating a sense of wonder, exploration, and joy`

const systemPrompt = `In a serene, magical garden, ${mimiDescription}, is depicted near a gentle water source with her mother, Lulu. ${luluDescription} Both are near a small, sparkling stream or pond, reflecting the magical environment around them. The scene is lush with vibrant flowers, greenery, and the gentle flow of water adds a peaceful ambiance. The sky above is painted with soft hues, enhancing the magical and tranquil atmosphere, symbolizing a moment of bonding and magical exploration between mother and daughter.`;

const response = await openai.images.generate({
  model: "dall-e-3",
  prompt: systemPrompt,
  n: 1,
  size: "1024x1024",
  response_format: "b64_json",
  // quality: "hd",
});


const targetFolder = path.resolve(`.out/S1E1/images`);
await $`mkdir -p ${targetFolder}`;

await Promise.allSettled(
  response.data.map(async (it) => {
    const hashName = generateHashFromText(
      it.revised_prompt ?? systemPrompt + Math.random()
    );
    const imageName = `${hashName}.png`; // Example image filename

    if (it.b64_json) {
      await saveBase64EncodedImage(it.b64_json, path.resolve(targetFolder,imageName));

      fs.writeFileSync(
        path.resolve(targetFolder,`${hashName}.prompt.txt`),
        it.revised_prompt ?? systemPrompt
      );
    }
    // TODO download url
    else console.log(it.url);
  })
);

// Function to save a base64-encoded image directly to the filesystem
async function saveBase64EncodedImage(encodedData: string, filePath: string) {
  // Decode the base64 string to binary data
  const binaryData = Buffer.from(encodedData, "base64");

  try {
    const fileType = await fileTypeFromBuffer(binaryData);
    if (fileType) {
      console.log(`Detected file type: ${fileType.mime}`);
      console.log(`Detected file extension: ${fileType.ext}`);
    } else {
      console.log("Could not determine the file type.");
    }
  } catch (error) {
    console.error("Error determining the file type:", error);
  }

  fs.writeFileSync(filePath, binaryData);
  console.log(`Image saved to ${filePath}`);
}

// Function to generate a SHA-256 hash from the given text
function generateHashFromText(text: string): string {
  // Create a SHA-256 hasher
  const hasher = createHash("sha256");
  // Update the hasher with the given text
  hasher.update(text);
  // Finalize the hash computation and return the result as a hexadecimal string
  return hasher.digest("hex");
}
