import os
import sys
import tempfile
import wave
import whisper


def print_audio_stats(file_path):
    # Assuming WAV format for property reading
    with wave.open(file_path, 'rb') as audio_file:
        length_seconds = audio_file.getnframes() / audio_file.getframerate()
        channels = audio_file.getnchannels()
        sample_width = audio_file.getsampwidth()
        frame_rate = audio_file.getframerate()

        print(f"Length: {length_seconds:.2f} seconds")
        print(f"Channels: {channels}")
        print(f"Sample Width: {sample_width} bytes")
        print(f"Frame Rate: {frame_rate} frames/second")

def transcribe_and_print_stats(audio_data):
    with tempfile.NamedTemporaryFile(delete=False) as temp_audio:
        file_path = temp_audio.name
        temp_audio.write(audio_data)
    
    # Print file stats
    file_size = os.path.getsize(file_path)
    print(f"File Size: {file_size} bytes")
    print(f"File Path: {file_path}")
    try:
        print_audio_stats(file_path)
    except wave.Error as e:
        print("Error reading audio properties, possibly not a WAV file or corrupted.")

    # Transcribe the audio file
    model = whisper.load_model("base")
    result = model.transcribe(file_path)
    print("```text\n"+result["text"]+"\n```")

    # Cleanup
    os.remove(file_path)

if __name__ == "__main__":
    # Read audio data from stdin
    audio_data = sys.stdin.buffer.read()
    transcribe_and_print_stats(audio_data)
