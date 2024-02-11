import { $ } from "bun";
import { command, run,binary, string, positional, option, boolean, number } from 'cmd-ts';

const audioToTextCommand = command({
  name: 'convertAudioToText',
  args: {
    audioFilePath: positional({
      type: string,
      description: 'The path to the audio file you want to transcribe',
    }),
    baseUrl: option({
      type: string,
      long: 'base-url',
      description: 'The base URL of the ASR service',
      defaultValue: () => 'http://localhost:9000/asr',
    }),
    encode: option({
      type: boolean,
      long: 'encode',
      description: 'Whether to encode the audio file',
      defaultValue: () => true,
    }),
    task: option({
      type: string,
      long: 'task',
      description: 'The task to perform',
      defaultValue: () => 'transcribe',
    }),
    language: option({
      type: string,
      long: 'language',
      description: 'The language of the audio',
      defaultValue: () => 'en',
    }),
    wordTimestamps: option({
      type: boolean,
      long: 'word-timestamps',
      description: 'Whether to include word timestamps in the output',
      defaultValue: () => false,
    }),
    output: option({
      type: string,
      long: 'output',
      description: 'The output format',
      defaultValue: () => 'txt',
    }),
  },
  handler: async (args) => {
    const { audioFilePath, baseUrl, encode, task, language, wordTimestamps, output } = args;

    const f = await $`cat ${audioFilePath}`.blob();

    const formData = new FormData();
    formData.append("audio_file", f, "output_file.wav");

    const p: Record<string, boolean | string | number> = {
      encode,
      task,
      language,
      word_timestamps: wordTimestamps,
      output,
    };
    const queryParams = new URLSearchParams(p as any).toString();

    const WHISPER_ASR_URL = `${baseUrl}?${queryParams}`;

    try {
      const response = await fetch(WHISPER_ASR_URL, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error(error.message);
    }
  },
});

run(binary(audioToTextCommand), process.argv);
