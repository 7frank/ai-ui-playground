---
title: Fiddling with CLI tools
---

Find a work flow that allows to use ai tools for developing software

## potential Tools

- https://github.com/BuilderIO/ai-shell
- https://github.com/TheR1D/shell_gpt
- https://github.com/peterdemin/openai-cli
- https://github.com/transitive-bullshit/chatgpt-api

potentially more interactive with files on

- [promptr](https://github.com/ferrislucas/promptr)
- [open-interpreter](https://github.com/KillianLucas/open-interpreter) (⚠ huge dependencies 20gb+)

### drawbacks

- so far these tools require you to have a paid openai subscription
- potentially you could run something like
  - [LMStudio](https://lmstudio.ai/) (same interface like chatgpt with local server )
  - https://localai.io / https://github.com/mudler/LocalAI (drop in replacement for chatgpt)

and customize the API endpoints

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

### edit & confirm text

The following is somewhat working but not fully

- `apt install moreutils`

- now you have vipe available: `echo "How is the weather in Munich today?" |  vipe | cat`

### prompt prefix & text

text e.g. `create a function to check the weather in src/utils.ts`

```
  You will be given a request additionally make sure to:
  - write a test
  - after creating files related to the test, run the test

  Request: ${text}
```

### send prompt to actual tool

#### install LMStudio

Linux install after download:

`chmod a+x LM+Studio-0.2.8-beta-v1.AppImage`
`./LM+Studio-0.2.8-beta-v1.AppImage`

> Failed due to no Nvindia or AMD GPU

#### use https://localai.io/

following this guide https://semaphoreci.com/blog/localai

We download some models like the ones here [Huggingface - Mistral-7B-Instruct-v0.2-GGUF](https://huggingface.co/TheBloke/Mistral-7B-Instruct-v0.2-GGUF/tree/main)

> Before the next step make sure that you have fee disk space.
> The docker image for local.ai alone is ~ 52GB 🤪.
> Each model can easily be 3-4GB.

- run `baobab` to find directories with large files that you can delete
- run `docker images -f "dangling=true" -q` to clean up your dangling images you probably forgot about

Start the local-ai docker container:

- `docker run -p 8080:8080 -v $PWD/models:/models -ti --rm quay.io/go-skynet/local-ai:latest --models-path /models --context-size 700 --threads 4`

download:

- `https://huggingface.co/TheBloke/Llama-2-13B-chat-GGML/tree/main`
- also tested with `mistral-7b-instruct-v0.2.Q5_K_S` but that is much slower `llama-2-13b-chat.Q2_K`



run:
```
curl http://localhost:8080/v1/completions -H "Content-Type: application/json" -d '{
     "model": "llama-2-13b-chat.Q2_K.gguf",
     "prompt": "2+2",
     "temperature": 0.7
   }'
```




#### attempt A (promptr)

`npm install -g @ifnotnowwhen/promptr`

- goto the installed node_modules folder and override the BASE_PATH with where localAI is running e.g.
- `node_modules/openai/dist/base.js`
  - `exports.BASE_PATH = "http://localhost:8080/v1".replace(/\/+$/, "");`

export OPENAI_BASE_URL="http://localhost:8080/v1"
`promptr  -v -d -m llama-2-13b-chat.Q2_K.gguf -p "Cleanup the code in src/index.js"`
`promptr  -v -m llama-2-13b-chat.Q2_K.gguf -p "Cleanup the code in src/index.js"`

- "llama-2-13b-chat.Q2_K.gguf"


- Result for LocalAI& promptr with the two models: 
  too slow, no real result

- using an api key seems to do better and bev reasonable fast

`export OPENAI_API_KEY=$(pass ai/oa-cli-tools-api-key) && promptr  -v -p "Cleanup the code in src/index.js"`


#### attempt B (open-interpreter)

https://github.com/KillianLucas/open-interpreter


create separate env for fiddling

- https://github.com/pyenv/pyenv#getting-pyenv
- [instructions for mint](https://forums.linuxmint.com/viewtopic.php?t=362499)
- `pyenv install 3.10.4`
- `pyenv global 3.10.4`
-  `export OPENAI_API_KEY=$(pass ai/oa-cli-tools-api-key)`