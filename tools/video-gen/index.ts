import { binary, command, option, run, string } from 'cmd-ts';
import { convertTextToSpeech, createVideoWithThumbnail } from './mediaUtils'; // Sie müssen diese Funktionen basierend auf den folgenden Beschreibungen implementieren.
import fs from "node:fs"
import { $ } from 'bun';


const app = command({
  name: 'createStoryVideo',
  args: {
    text: option({
      type: string,
      long: 'text',
      description: 'Der Text der Geschichte',
     
    }),
    imagePath: option({
      type: string,
      long: 'imagePath',
      description: 'Der Pfad zum Thumbnail-Bild',
     
    }),
  },
  handler: async ({ text, imagePath }) => {

   if (fs.existsSync(text))
   {
    text=await $`cat ${text}`.text()
   }

    const audioPath = await convertTextToSpeech(text);
    await createVideoWithThumbnail(imagePath, audioPath);
  },
});

run(binary(app), process.argv);

