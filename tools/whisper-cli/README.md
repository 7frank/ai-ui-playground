
# Whisper CLI Tool Documentation

This CLI tool serves as a basic wrapper for speech-to-text functionality utilizing "whisper". In an ideal scenario, this project would evolve into a neatly packaged, installable CLI, similar to the concept outlined in [this GitHub repository](https://github.com/GucciFlipFlops1917/Whisper-Speech-To-Text). For a more comprehensive solution, consider exploring the mentioned repository.

## Important Note

- **Approach 2** is currently functional and recommended if you're interested in executing the tool within a Docker container. 
- **Approach 1** encounters issues with keyboard input due to limitations with Docker, and is not recommended for use.

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

### Troubleshooting for Approach 1

- If the keyboard is not working in the Docker container, this setup allows running keyboard input with some limitations:
  ```
  docker build -f ./Dockerfile3 -t whisper-test .
  docker run -i --privileged whisper-test
  ```
