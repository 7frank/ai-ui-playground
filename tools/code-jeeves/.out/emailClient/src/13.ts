

/**
 * This is a utility function that formats the email message
 * @param {string} recipient - The email recipient
 * @param {string} subject - The email subject
 * @param {string} body - The email body
 * @returns {string} - The formatted email message
 */
const formatEmail = (recipient: string, subject: string, body: string): string => {
  return `To: ${recipient}\nSubject: ${subject}\n\n${body}`;
}

/**
 * This is a utility function that sends the email message using the cmd-ts package
 * @param {string} email - The formatted email message
 */
const sendEmail = (email: string): void => {
  cmd.ts('send', email);
}

/**
 * This is an interface for the email data
 */
interface EmailData {
  recipient: string;
  subject: string;
  body: string;
}

/**
 * This is the writeEmail function that uses the cmd-ts package to send an email
 * @param {EmailData} data - The data needed to write an email
 */
const writeEmail = (data: EmailData): void => {
  const email = formatEmail(data.recipient, data.subject, data.body);
  sendEmail(email);
}

export { writeEmail };
