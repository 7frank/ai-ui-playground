
/**
 * This function takes in an array of emails and returns a promise that resolves to a single email.
 * The emails are selected using the 'inquirer' preference.
 * @param emails An array of Email objects.
 * @returns A promise that resolves to a single Email object.
 */
export function selectEmail6(emails: Email[]): Promise<Email> {
  // Create a new inquirer prompt with the list of emails as choices.
  const emailPrompt = inquirer.prompt({
    type: 'list',
    name: 'selectedEmail',
    message: 'Select an email to open:',
    choices: emails.map(email => email.subject)
  })
  
  // Return a promise that resolves to the selected email.
  return new Promise((resolve, reject) => {
    emailPrompt.then(answer => {
      // Find the selected email in the array.
      const selectedEmail = emails.find(email => email.subject === answer.selectedEmail)
      
      // If a matching email is found, resolve the promise with it.
      if (selectedEmail) {
        resolve(selectedEmail)
      } else {
        // If no matching email is found, reject the promise with an error message.
        reject('No email was selected.')
      }
    })
  })
}
