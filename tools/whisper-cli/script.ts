
  // Assuming Bun is used, which has native support for fetch and FormData

  const fs = require('fs');
  const path = require('path');
// Replace with the path to your audio file
const AUDIO_FILE_PATH = "/tmp/output_file.wav";



async function convertAudioToText() {
    // Path to your audio file
    const audioFilePath = path.resolve(__dirname, AUDIO_FILE_PATH);
    const audioBuffer = fs.readFileSync(audioFilePath);

    const formData = new FormData();
    formData.append('audio_file', new Blob([audioBuffer]), 'output_file.wav');

    // Add any additional query parameters you need
    const queryParams = new URLSearchParams({
        encode: true,
        task: 'transcribe',
        language: 'en',
        word_timestamps: false,
        output: 'txt',
    }).toString();

    const WHISPER_ASR_URL = `http://localhost:9000/asr?${queryParams}`;

    try {
        const response = await fetch(WHISPER_ASR_URL, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const result = await response.text(); 
        console.log('Transcription Result:', result);
    } catch (error) {
        console.error('Error:', error);
    }
}

convertAudioToText();

