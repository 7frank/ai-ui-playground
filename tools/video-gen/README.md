# video-gen


https://chat.openai.com/c/4931e81d-312b-42c6-a6ed-325e88ef8555

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts

bun run index.ts --text "Your story here."

# generate video from
bun run index.ts --text ./assets/story1_en.txt --imagePath "./assets/story1/images/img%03d.jpg" -o .out

# batch convert images
bun run batchRenameImages.ts assets/story1/images/ *.webp

```

This project was created using `bun init` in bun v1.0.25. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## How to


    
- Start the TTS server

```bash
# see https://github.com/coqui-ai/TTS/pkgs/container/tts-cpu#docker-image
docker run --rm -it -p 5002:5002 --entrypoint /bin/bash ghcr.io/coqui-ai/tts-cpu
python3 TTS/server/server.py --list_models #To get the list of available models
python3 TTS/server/server.py --model_name tts_models/en/vctk/vits # To start a server
```

-goto `http://localhost:5002/`
