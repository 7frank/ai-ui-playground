import { exec as execCallback } from "child_process";
import { promisify } from "util";

// Convert exec to a promise-based function
const exec = promisify(execCallback);

/**
 * bun shell cannot run full commands,thus we need this work around for siome cases (e.g. testCommand)
 * 
 */
export async function runCommand(
  command: string,
): Promise<{ stderr?: string; stdout?: string }> {
  try {
    // Execute the command
    const { stdout, stderr } = await exec(command);

    return { stdout, stderr };
  } catch (error) {
    // Handle errors
    return { stderr: (error as any).message };
  }
}
