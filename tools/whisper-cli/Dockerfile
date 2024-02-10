# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Whisper
RUN pip install --upgrade pip setuptools wheel && \
    pip install git+https://github.com/openai/whisper.git

RUN apt-get update && \
    apt-get install -y ffmpeg

# Copy the whisper transcribe script into the container
COPY transcribe.py .

# Run transcribe.py when the container launches
ENTRYPOINT ["python", "transcribe.py"]