
/**
 * Interface for an email.
 */
interface Email {
  sender: string;
  subject: string;
  content: string;
}

/**
 * Selects an email to open.
 * 
 * @param emails List of emails to select from.
 * @returns A promise that resolves with the selected email.
 */
function selectEmail11(emails: Email[]): Promise<Email> {
  return new Promise((resolve, reject) => {
    const choices = emails.map(email => ({
      name: `${email.sender}: ${email.subject}`,
      value: email
    }));

    inquirer
      .prompt({
        type: 'list',
        name: 'email',
        message: 'Which email would you like to open?',
        choices
      })
      .then(answer => resolve(answer.email))
      .catch(reject);
  });
}

export default selectEmail11;
