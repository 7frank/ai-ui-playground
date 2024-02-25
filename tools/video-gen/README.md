# video-gen

This thingy currently semi-automatically generates videos from a series of input images and text that is converted to audio.

# resources

https://chat.openai.com/c/4931e81d-312b-42c6-a6ed-325e88ef8555
https://pixabay.com/sound-effects/search/sunny/


# TODO

- check out logo and captions examples https://github.com/h2non/videoshow/tree/master/examples
- TODO add silence 
```bash
rec filename.wav trim 0 120 

ffmpeg -i .out/result.orig.wav -af "adelay=3s:all=true" .out/result.wav

ffmpeg -i assets/ambient/silence2s.wav -i .out/result.orig.wav -i assets/ambient/silence10s.wav -filter_complex "[0:a][1:a][2:a]concat=n=3:v=0:a=1[a]" -map "[a]" .out/result.wav

```
# To install dependencies:

```bash
bun install
```

# to run stuff


## to run the text-to-speech (TTS)

- Start the TTS server

```bash
# see https://github.com/coqui-ai/TTS/pkgs/container/tts-cpu#docker-image
docker run --rm -it -p 5002:5002 --entrypoint /bin/bash ghcr.io/coqui-ai/tts-cpu
python3 TTS/server/server.py --list_models #To get the list of available models
python3 TTS/server/server.py --model_name tts_models/en/vctk/vits # To start a server
```

- (to see the gui if you want to manually pla ywith settings of this step) goto `http://localhost:5002/`


## To run the text-to-audio-to-video step:

```bash

# batch convert images which you will need for the video slide show
bun run batchRenameImages.ts assets/story1/images/ *.webp

# run the text-to-video step (this is the main use case)
bun run index.ts --text ./assets/story1_en.txt --imagePath "assets/story1/images/img%03d.webp" -o .out

# fiddle with the audio part only
bun run index.ts --text "Your story here."


```

