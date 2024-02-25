# video-gen

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts

bun run index.ts --text "Ihre Geschichte hier" --imagePath "/pfad/zum/thumbnail.jpg"
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
