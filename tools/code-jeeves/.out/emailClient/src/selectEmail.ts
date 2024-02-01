
/**
 * selectEmail function allows the user to select an email to open
 * @param emails Array of Email objects containing all the emails
 * @returns A function that opens the selected email
 */
export const selectEmail = (emails: Email[]) => {
    // Import necessary packages
    const cmd = require('cmd-ts');
    const bun = require('bun');
    const inquirer = require('inquirer');
    const _ = require('lodash-es');

    // Declare and initialize variables
    let selectedEmail: Email;
    let openedEmail: Email;

    // Create utility function to display email options
    const displayEmailOptions = (emails: Email[]) => {
        // Map emails to an array of choices for inquirer
        const emailChoices = emails.map(email => ({
            name: email.subject,
            value: email,
        }));
        // Ask user to select an email
        inquirer.prompt([
            {
                type: 'list',
                name: 'selectedEmail',
                message: 'Select an email to open:',
                choices: emailChoices,
            },
        ]).then((answers: any) => {
            // Update selectedEmail variable with user's choice
            selectedEmail = answers.selectedEmail;
            // Open the selected email
            openEmail();
        });
    };

    // Create utility function to open selected email
    const openEmail = () => {
        // Display the selected email's information
        console.log(`Subject: ${selectedEmail.subject}`);
        console.log(`Sender: ${selectedEmail.sender}`);
        console.log(`Body: ${selectedEmail.body}`);
        // Update openedEmail variable with the selected email
        openedEmail = selectedEmail;
    };

    // Call utility function to display email options
    displayEmailOptions(emails);

    // Return the function to open the selected email
    return openEmail;
}

// Interface for Email type
interface Email {
    subject: string;
    sender: string;
    body: string;
}
