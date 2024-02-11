import { spawn } from "child_process";

// Set stdin in raw mode to listen to keystrokes
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding('utf8');

// This function will start the recording process
function startRecording() {
  console.log('Recording started. Press "Space" or "Enter" to accept, "Esc" or "Q" to reject.');

  const arecordProcess = spawn('arecord', ['>', '/tmp/output_file.wav'], {
    shell: true, // Use shell to interpret the redirection
  });

  return new Promise((resolve, reject) => {
    process.stdin.on('data', (key) => {
      // Convert key to string and check for conditions
      const keyPressed = key.toString();
      
      // If "Space" or "Enter" is pressed
      if (keyPressed === ' ' || keyPressed === '\r') {
        console.log('Recording accepted.');
        arecordProcess.kill(); // Stop recording
        resolve('Accepted');
      }
      // If "Esc" or "Q" is pressed
      else if (keyPressed === '\u001b' || keyPressed.toLowerCase() === 'q') {
        console.log('Recording rejected.');
        arecordProcess.kill(); // Stop recording
        reject('Rejected');
      }
    });
  });
}

startRecording().then(
  (message) => {
    console.log(`Promise resolved: ${message}`);
    process.stdin.setRawMode(false);
    process.stdin.pause(); // Stop listening to input
  },
  (error) => {
    console.error(`Promise rejected: ${error}`);
    process.stdin.setRawMode(false);
    process.stdin.pause(); // Cleanup
  }
);
