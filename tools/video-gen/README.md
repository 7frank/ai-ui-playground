# video-gen

This thingy currently semi-automatically generates videos from a series of input images and text that is converted to audio.

# resources

https://chat.openai.com/c/4931e81d-312b-42c6-a6ed-325e88ef8555
https://pixabay.com/sound-effects/search/sunny/


# TODO

- check out logo and captions examples https://github.com/h2non/videoshow/tree/master/examples
- 
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

## To add silence manually for the moment

```bash
rec filename.wav trim 0 120 

ffmpeg -i .out/result.orig.wav -af "adelay=3s:all=true" .out/result.wav

ffmpeg -i assets/ambient/silence2s.wav -i .out/result.orig.wav -i assets/ambient/silence10s.wav -filter_complex "[0:a][1:a][2:a]concat=n=3:v=0:a=1[a]" -map "[a]" .out/result.wav

```

## generate an episode

This is a more structured approach to generating an episode

- generate an episode 
    - `bun run src/prompt.ts > assets/Arc/S1E1.screenplay.json`
- convert the screenplay into audio snippets
    - `bun run src/episodeToAudio.ts `
- concat files `sox .out/S1E1/*_*.wav .out/S1E1/result.wav pad 2 10`

- generate images via openai dalle-3 `bun run src/episodeToImages.ts`

- convert png top webp manually 
    - `ffmpeg -i assets/Arc/S1E1/images/img-6BVIzZGpEVmxypbHuW3IvWHS.png -c:v libwebp result.webp`
- batch rename images `bun run batchRenameImages.ts assets/Arc/S1E1/images/ *.webp`

- `bun run index.ts --text ""  --imagePath "assets/Arc/S1E1/images/img%03d.webp" -o .out/S1E1`

- add logo in S1E2
`
ffmpeg -i .out/S1E1/result.mp4 -loop 0 -t 5  -i ./assets/logo/logo2.webp -filter_complex "[1:v]format=rgba,fade=in:st=1:d=3:alpha=1,fade=out:st=6:d=3:alpha=1 [ovr]; [0][ovr] overlay=format=auto" -codec:a copy .out/S1E1/final.mp4
`
    -  (center logo)
- TODO slow down audio
- emotions



### emotion style transfer

https://github.com/ide8/tacotron2?tab=readme-ov-file#inference

## WIP (move to docs) music style transfer

handy script to shorten audio tracks
`ffmpeg -i assets/misc/Tetris.mp3 -ss 00:00:00 -to 00:00:15 -c copy assets/misc/Tetris15s.mp3`

### https://huggingface.co/spaces/jhtonyKoo/music_mixing_style_transfer

> Tested this with a few sample but to no degree viable for current use case we envisioned



https://huggingface.co/spaces/jhtonyKoo/music_mixing_style_transfer
https://arxiv.org/pdf/2211.02247.pdf
https://sigsep.github.io/datasets/

https://archive.org/details/TetrisThemeMusic
https://www.noiiz.com/sounds/playlists/399724

https://d7d3471nr939s.cloudfront.net/SimplySoulful_Noiiz/MP3/Loops/Synths/155_E_KeptPretenseSynth_02_654.mp3?cb=49b90cc9-87e3-4d1b-9851-31a3867e67fa


## other tts

### piper
 
 https://rhasspy.github.io/piper-samples/ 
 - try out `us english libritts_r 1638(7)` as narrator voice
 - open source lots of speaker voices
 - emotions via voices (sometimes, see thorsten_emotional, german )

### suno bark

- https://github.com/suno-ai/bark?tab=readme-ov-file 
