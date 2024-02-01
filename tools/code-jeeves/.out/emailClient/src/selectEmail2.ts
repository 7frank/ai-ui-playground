

/**
 * A type representing an email.
 */
type Email = {
  sender: string,
  subject: string,
  message: string
}

/**
 * A function that selects an email to open.
 * @param emails An array of emails.
 * @returns A promise that resolves with the selected email.
 */
export function selectEmail2(emails: Email[]): Promise<Email> {
  // Create a prompt using 'inquirer' to select an email from the array
  const prompt = require('inquirer').createPromptModule();
  const questions = [
    {
      type: 'list',
      name: 'selectedEmail',
      message: 'Select an email to open:',
      choices: emails.map(email => `${email.sender}: ${email.subject}`)
    }
  ];

  // Use the prompt to get the selected email
  return prompt(questions).then(answers => {
    // Find the selected email in the array and return it
    const selectedEmail = answers.selectedEmail;
    return emails.find(email => `${email.sender}: ${email.subject}` === selectedEmail);
  });
}
