

/**
 * A type representing an email.
 */
interface Email {
  sender: string;
  subject: string;
  body: string;
}

/**
 * Displays fetched emails to the user.
 * @param emails An array of emails to be displayed.
 * @returns void
 */
const displayEmails = (emails: Email[]): void => {
  for (let i = 0; i < emails.length; i++) {
    console.log("From: " + emails[i].sender);
    console.log("Subject: " + emails[i].subject);
    console.log("Body: " + emails[i].body);
  }
}

export { displayEmails };
