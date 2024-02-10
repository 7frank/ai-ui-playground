# Whats that, you ask?


This cli is a rough fiddle wrapping up speech to text functionality using "whisper".
In a better world thiswould be neatly wrapped as a installable cli

Similar to https://github.com/GucciFlipFlops1917/Whisper-Speech-To-Text in mind.
Give that a shot if you are looking fore a more fleshed out solution.

## installation

build the docker image and tag as `whisper-transcribe`
`docker build -t whisper-transcribe .`

## usage

record audio as wav e.g. with arecord:
`sleep 3; arecord > /tmp/output_file.wav`

use whisper to convert stuff
`cat /tmp/output_file.wav | docker run -i whisper-transcribe`