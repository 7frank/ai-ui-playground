

/**
 * Interface for the email object.
 */
interface Email {
  sender: string;
  recipient: string;
  subject: string;
  body: string;
}

/**
 * Function that displays the selected email.
 * @param email - an email object to display.
 */
export function displayEmail8(email: Email): void {
  console.log(`Sender: ${email.sender}`);
  console.log(`Recipient: ${email.recipient}`);
  console.log(`Subject: ${email.subject}`);
  console.log(`Body: ${email.body}`);
}
