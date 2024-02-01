
/**
 * Interface that defines the structure of an Email.
 * @property {string} subject - The subject of the Email.
 * @property {string} body - The body of the Email.
 * @property {string} sender - The sender of the Email.
 * @property {string[]} recipients - The recipients of the Email.
 */
interface Email {
  subject: string;
  body: string;
  sender: string;
  recipients: string[];
}

/**
 * Function that writes an email and returns a Promise with the Email object.
 * @returns {Promise<Email>} A Promise with the Email object.
 */
export function writeEmail7(): Promise<Email> {
  // Import the inquirer library for user input.
  const inquirer = require('inquirer');

  // Create a new Promise that will be returned.
  return new Promise((resolve, reject) => {
    // Use inquirer to prompt the user for the necessary information.
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'subject',
          message: 'Enter the subject of the email:',
        },
        {
          type: 'input',
          name: 'body',
          message: 'Enter the body of the email:',
        },
        {
          type: 'input',
          name: 'sender',
          message: 'Enter the sender of the email:',
        },
        {
          type: 'input',
          name: 'recipients',
          message: 'Enter the recipients of the email (separated by commas):',
        },
      ])
      .then(answers => {
        // Split the recipients string into an array.
        const recipients = answers.recipients.split(',');

        // Create a new Email object with the user input.
        const email: Email = {
          subject: answers.subject,
          body: answers.body,
          sender: answers.sender,
          recipients: recipients,
        };

        // Resolve the Promise with the Email object.
        resolve(email);
      })
      .catch(error => {
        // If there was an error, reject the Promise.
        reject(error);
      });
  });
}
