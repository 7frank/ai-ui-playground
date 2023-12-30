---
title: Fiddling with CLI tools
---

Find a work flow that allows to use ai tools for developing software

## potential Tools

- https://github.com/BuilderIO/ai-shell
- https://github.com/ferrislucas/promptr
- https://github.com/TheR1D/shell_gpt
- https://github.com/peterdemin/openai-cli
- https://github.com/transitive-bullshit/chatgpt-api

### drawbacks

- so far these tools require you to have a paid openai subscription
- potentially you could run something like LMStudio and customize the API endpoints

## attempt 1

### record mp3

find some tools for your purpose:

- `sleep 3; arecord > output_file.wav`

- `arecord -v -f cd -t raw | lame -r - output.mp3`

- `sleep 3; arecord -r 16000 | sox -t wav - output_file.wav highpass 3000`

- `ffmpeg -f alsa -i hw:0 -acodec libmp3lame -ar 44100 -ab 192k output.mp3`

For me, using arecord and ffmpeg gave the best results.

```
alias record_mp3='f(){ echo "Recording will start in 2 seconds"; sleep 2; rm -f "$1"; arecord -f cd -t wav | ffmpeg -i - -acodec libmp3lame -ar 44100 -ab 192k "$1"; unset -f f; }; f'
```

- run with e.g. `record_mp3 output.mp3`

### send mp3 to speech-to-text service

- [whisper](https://huggingface.co/openai/whisper-large)
- this could be part of the openai API or part of a self hosted (local model running)
- https://github.com/innovatorved/whisper-openai-gradio-implementation

somewhat ok quality was achieved with: a "mozilla-deepspeech" docker container

```
docker run --rm -v "$(pwd):/audio" -ti gencore/audio-transcribe-mozilla-deepspeech output.mp3
```

### prompt prefix & text

text e.g. `create a function to check the weather in src/utils.ts`

```
  You will be given a request additionally make sure to:
  - write a test
  - after creating files related to the test, run the test

  Request: ${text}
```

### send prompt to actual tool
