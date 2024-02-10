import sys
import whisper

def transcribe():
    model = whisper.load_model("base")  # Load the Whisper model of your choice
    audio_data = sys.stdin.buffer.read()  # Read audio data from stdin
    
    # Save the audio data to a temporary file
    temp_audio_path = "temp_audio.wav"
    with open(temp_audio_path, "wb") as audio_file:
        audio_file.write(audio_data)
    
    # Transcribe the audio file
    result = model.transcribe(temp_audio_path)
    print(result["text"])

if __name__ == "__main__":
    transcribe()