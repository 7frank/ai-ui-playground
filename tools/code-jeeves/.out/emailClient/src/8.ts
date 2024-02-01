

/**
 * Function to display a list of emails.
 * @param emails - An array of email addresses.
 * @returns A string containing the formatted list of emails.
 */
export function displayEmails(emails: string[]): string {
  let emailsList = '';

  // Loop through the array of emails and add them to the list.
  for (let i = 0; i < emails.length; i++) {
    emailsList += `${i + 1}) ${emails[i]}\n`;
  }

  return emailsList;
}
