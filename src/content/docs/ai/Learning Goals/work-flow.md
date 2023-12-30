---
title: Fiddling with CLI tools
---

Find a work flow that allows to use ai tools for developing software

## potential Tools

- https://github.com/BuilderIO/ai-shell
- https://github.com/ferrislucas/promptr
- https://github.com/TheR1D/shell_gpt
- https://github.com/peterdemin/openai-cli

### drawbacks

- so far these tools require you to have a paid openai subscription
- potentially you could run something like LMStudio and customize the API endpoints

## attempt 1

### record mp3

`arecord -v -f cd -t raw | lame -r - output.mp3`

### send mp3 to speech-to-text service

- [whisper](https://huggingface.co/openai/whisper-large)
- this could be part of the openai API or part of a self hosted (local model running)
- https://github.com/innovatorved/whisper-openai-gradio-implementation

### prompt prefix & text

text e.g. `create a function to check the weather in src/utils.ts`

```
  You will be given a request additionally make sure to:
  - write a test
  - after creating files related to the test, run the test

  Request: ${text}
```

### send prompt to actual tool
