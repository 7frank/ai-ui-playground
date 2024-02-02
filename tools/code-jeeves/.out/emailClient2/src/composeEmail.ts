// Since the requirements specify the use of TypeScript features (such as TSDoc and type declarations),
// this solution will be presented in TypeScript despite the specified file extension being 'js'.
// The actual implementation in a JavaScript environment would require removing types and possibly comments,
// depending upon the use case.

import * as inquirer from "inquirer";

/**
 * Represents an email with basic content.
 */
interface EmailContent {
  to: string;
  subject: string;
  body: string;
}

/**
 * Prompts the user to compose an email.
 * Uses inquirer for input prompts including recipient address, subject, and body of the email.
 * @returns A promise that resolves to an object containing email details.
 */
export function composeEmail(): Promise<EmailContent> {
  return promptEmailDetails();
}

/**
 * Internal function to handle the inquirer prompts and gather email content.
 * @returns A promise that resolves to the content of the email.
 */
async function promptEmailDetails(): Promise<EmailContent> {
  const questions = [
    {
      type: "input",
      name: "to",
      message: "To (Email address):",
      validate: (input) =>
        input.includes("@") ? true : "Please enter a valid email address.",
    },
    {
      type: "input",
      name: "subject",
      message: "Subject:",
      validate: (input) =>
        input.trim() !== "" ? true : "Subject cannot be empty.",
    },
    {
      type: "input",
      name: "body",
      message: "Email Body:",
      validate: (input) =>
        input.trim() !== "" ? true : "Email body cannot be empty.",
    },
  ];

  const answers: EmailContent = await inquirer.prompt(questions);
  return answers;
}
