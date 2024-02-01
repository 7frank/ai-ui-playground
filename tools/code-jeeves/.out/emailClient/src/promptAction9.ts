

/**
 * Implementation of promptAction9 function which prompts the user for their next action and returns a promise.
 * @return A promise of type void.
 */
export function promptAction9(): Promise<void> {
    return new Promise((resolve, reject) => {
        // Import inquirer library for prompting user
        const inquirer = require('inquirer');
        // Define questions to ask user
        const questions = [
            {
                type: 'input',
                name: 'action',
                message: 'What is your next action?'
            }
        ];
        // Use inquirer to prompt user with questions
        inquirer.prompt(questions)
            .then((answers) => {
                // Resolve the promise with the user's input
                resolve();
            })
            .catch((error) => {
                // Reject the promise with the error
                reject(error);
            });
    });
}
