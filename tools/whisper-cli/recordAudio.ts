import { spawn } from "child_process";
import { command, run, string, positional, option, number, binary } from 'cmd-ts';

const recordAudioCommand = command({
  name: 'recordAudio',
  args: {
    outputFile: positional({
      type: string,
      description: 'The path to the output file where the audio will be saved',
    }),
    maxDuration: option({
      type: number,
      long: 'max-duration',
      description: 'Maximum recording duration in milliseconds',
      defaultValue: () => 0, // No limit by default
    }),
  },
  handler: (args) => {
    const { outputFile, maxDuration } = args;
    console.log(`Recording will be saved to: ${outputFile}`);
    if (maxDuration > 0) {
      console.log(`Maximum recording duration: ${maxDuration} ms`);
    }
    startRecording(outputFile, maxDuration);
  },
});

// Set stdin in raw mode to listen to keystrokes
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding('utf8');

function startRecording(outputFile: string, maxDuration: number) {
  console.log('Recording started. Press "Space" or "Enter" to accept, "Esc" or "Q" to reject.');

  const arecordProcess = spawn('arecord', ['-f', 'cd', '-t', 'wav', outputFile]);

  if (maxDuration > 0) {
    setTimeout(() => {
      arecordProcess.kill();
      console.log('Maximum duration reached, recording stopped.');
      process.stdin.setRawMode(false);
      process.stdin.pause();
    }, maxDuration);
  }

  process.stdin.on('data', (key) => {
    const keyPressed = key.toString();
    
    if (keyPressed === ' ' || keyPressed === '\r') {
      console.log('Recording accepted.');
      arecordProcess.kill(); // Stop recording
      process.stdin.setRawMode(false);
      process.stdin.pause(); // Stop listening to input
    } else if (keyPressed === '\u001b' || keyPressed.toLowerCase() === 'q') {
      console.log('Recording rejected.');
      arecordProcess.kill(); // Stop recording
      process.stdin.setRawMode(false);
      process.stdin.pause(); // Cleanup
    }
  });
}

run(binary(recordAudioCommand), process.argv);
