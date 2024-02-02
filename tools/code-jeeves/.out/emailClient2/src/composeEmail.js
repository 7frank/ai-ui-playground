const inquirer = require('inquirer');

/**
 * Prompts the user to compose an email with `to`, `subject`, and `body` fields.
 * 
 * Utilizes the `inquirer` package to gather user inputs.
 * @returns A Promise that resolves to an object containing `to`, `subject`, and `body` of the email.
 */
export function composeEmail() {
  const questions = [
    {
      type: 'input',
      name: 'to',
      message: 'To:',
      validate(input) {
        // Basic validation to ensure some input is provided
        if (input.trim() === '') {
          return 'Recipient is required.';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'subject',
      message: 'Subject:',
      // No validation applied, subject can be empty
    },
    {
      type: 'input',
      name: 'body',
      message: 'Body:',
      // No validation applied, body can be empty
    }
  ];

  return inquirer.prompt(questions);
}

