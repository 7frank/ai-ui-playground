

/**
 * Prompts the user for the next action.
 * @returns A promise that resolves to void.
 */
export function promptAction14(): Promise<void> {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt({
        type: 'input',
        name: 'action',
        message: 'What is your next action?',
      })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}
