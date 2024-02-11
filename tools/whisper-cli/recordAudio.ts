import { $ } from "bun";

// Set stdin in raw mode to listen to keystrokes
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding('utf8');

let keepRunning = true;

// Listen for any keypress
process.stdin.on('data', (key) => {
  // If the user presses "q", stop the loop
  if (key === 'q') {
    keepRunning = false;
    console.log('Stopping...');
    process.stdin.setRawMode(false);
    process.stdin.pause(); // Stop listening to input
  }
});

async function runCommand() {
  while (keepRunning) {
    // Replace this command with your actual command
    await $`echo "Hello"`;
    // Add a delay to prevent spamming the command too quickly
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
  }
  return "data"
}

console.log('Press "q" to stop the script...');
const res=await runCommand();

console.log(res)
