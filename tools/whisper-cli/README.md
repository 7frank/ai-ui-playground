
# Whisper CLI Tool Documentation

This CLI tool serves as a basic wrapper for speech-to-text functionality utilizing "whisper". In an ideal scenario, this project would evolve into a neatly packaged, installable CLI, similar to the concept outlined in [this GitHub repository](https://github.com/GucciFlipFlops1917/Whisper-Speech-To-Text). For a more comprehensive solution, consider exploring the mentioned repository.

## Important Note

- **Approach 2** is currently functional and recommended if you're interested in executing the tool within a Docker container. 
- **Approach 1** encounters issues with keyboard input due to limitations with Docker, and is not recommended for use.
- **Approach 3** works as well but currently hides the speech prompt when used with "runAll"

## Approach 1: Using an Existing Solution and Dockerizing It

### Installation

1. Clone this repository:
   ```
   git clone <repository-url>
   ```
2. Build the Docker image:
   ```
   docker build -f ./Dockerfile2 -t whisper-cli .
   ```

### Usage (Work in Progress)

- To run with basic capabilities:
  ```
  docker run -i --cap-add=SYS_RAWIO --cap-add=SYS_TTY_CONFIG -v ~/.cache/whisper:/.cache/whisper whisper-cli
  ```
- Partially working alternative:
  ```
  docker run -i --privileged -v ~/.cache/whisper:/.cache/whisper whisper-cli
  ```
- To only print text:
  ```
  docker run -i whisper-cli --print_text
  ```


### Troubleshooting for Approach 1

- If the keyboard is not working in the Docker container, this setup allows running keyboard input with some limitations:
  ```
  docker build -f ./Dockerfile3 -t whisper-test .
  docker run -i --privileged whisper-test
  ```  

## Approach 2: Custom Approach

### Installation

Build the Docker image and tag as `whisper-transcribe`:
```
docker build -t whisper-transcribe .
```

### Usage

1. Record audio in WAV format, e.g., using `arecord`:
   ```
   sleep 3; arecord > /tmp/output_file.wav
   ```
2. Use whisper to transcribe the audio:
   ```
   cat /tmp/output_file.wav | docker run -i whisper-transcribe
   ```

### Work in Progress: Creating an Actual Useful Script

This part includes the recording and converting process:
```
echo "Recording in 3..."; sleep 1; echo "Recording in 2..."; sleep 1; arecord > /tmp/output_file.wav || cat /tmp/output_file.wav | docker run -i whisper-transcribe
```

## Approach 3: whisper as local service and cli that curls it

### Installation

https://github.com/ahmetoner/whisper-asr-webservice


https://ahmetoner.com/whisper-asr-webservice/run/

start the server
```
# Interactive Swagger API documentation is available at http://localhost:9000/docs
docker run -d -p 9000:9000 -e ASR_MODEL=base -e ASR_ENGINE=openai_whisper onerahmet/openai-whisper-asr-webservice:latest

# with cache
docker run -d -p 9000:9000 -v ~/.cache/whisper onerahmet/openai-whisper-asr-webservice:latest

```

### speech-2-text

to record
`bun recordAudio.ts /tmp/output_file.wav`

convert the audio file
`bun ./script.ts /tmp/output_file.wav`

let's string them together
`bun recordAudio.ts /tmp/f1.wav && bun ./script.ts /tmp/f1.wav`

run them as one script 
`bun runAll.ts`

or pipe the uptput to our code-monkey
`bun runAll.ts |  jee sh exec -q -`
