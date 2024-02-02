```javascript
import { find } from 'lodash-es';

/**
 * Represents an email.
 * @typedef {Object} Email
 * @property {string} id - The unique identifier of the email.
 * @property {string} from - The email address of the sender.
 * @property {string} subject - The subject of the email.
 * @property {string} body - The body content of the email.
 */

/**
 * An array simulating an email database for example purposes.
 * @type {Email[]}
 */
const emailDatabase = [
  // Sample emails
  {id: '1', from: 'example@example.com', subject: 'Hello', body: 'Hello there!'},
  // Add more sample emails as needed
];

/**
 * Opens and displays the content of the selected email given its unique identifier.
 * @param {string} emailId The unique identifier of the email to open.
 */
export function openSelectedEmail(emailId) {
  // Use lodash's find() to search for the email by ID in a mock database
  const email = find(emailDatabase, { id: emailId });

  if (!email) {
    console.error('Email not found.');
    return;
  }

  // Display email details - implementation would depend on the platform (web, console, etc.)
  // This is a basic console example for illustration purposes.
  console.log(`From: ${email.from}`);
  console.log(`Subject: ${email.subject}`);
  console.log(`Body: ${email.body}`);
}
```
