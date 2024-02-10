# Whats that, you ask?


This cli is a rough fiddle wrapping up speech to text functionality using "whisper".
In a better world thiswould be neatly wrapped as a installable cli

Similar to https://github.com/GucciFlipFlops1917/Whisper-Speech-To-Text in mind.
Give that a shot if you are looking fore a more fleshed out solution.

Note: Approach (2) is working, while (1) fails with keyboard errors due to dockerization issue

# (1) using an existsing solution and dockerizing it

## installation

clone this repo `git clone ..`

build the image `docker build -f ./Dockerfile2 -t whisper-cli .`

## usage

WIP 

`docker run -i --cap-add=SYS_RAWIO --cap-add=SYS_TTY_CONFIG -v ~/.cache/whisper:/.cache/whisper whisper-cli`
`docker run -i --privileged -v ~/.cache/whisper:/.cache/whisper whisper-cli`

`docker run -i whisper-cli --print_text`



# (2) custom approach

## installation

build the docker image and tag as `whisper-transcribe`
`docker build -t whisper-transcribe .`

## usage

record audio as wav e.g. with arecord:
`sleep 3; arecord > /tmp/output_file.wav`

use whisper to convert stuff
`cat /tmp/output_file.wav | docker run -i whisper-transcribe`

```bash
# untested caching model
# mkdir ~/.cache/whisper
# cat /tmp/output_file.wav | docker run -v ~/.cache/whisper:/.cache/whisper -i whisper-transcribe
```