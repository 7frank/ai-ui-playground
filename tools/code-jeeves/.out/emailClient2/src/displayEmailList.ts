import { prompt } from "inquirer";

/**
 * Display the list of fetched emails on the command line, allowing the user to scroll through and select one.
 *
 * @param emails - An array of emails to be displayed.
 * @returns Promise<void> - A promise that resolves once an email has been selected.
 */
export async function displayEmailList(emails: string[]): Promise<void> {
    // Validate the input emails array
    if (!Array.isArray(emails) || !emails.every(email => typeof email === 'string')) {
        throw new TypeError('The emails argument must be an array of strings.');
    }

    // Ensure there are emails to display
    if (emails.length === 0) {
        console.log('No emails to display.');
        return;
    }
    
    const choices = emails.map(email => ({ name: email }));

    try {
        // Use inquirer to display a scrollable list of emails
        const { selectedEmail } = await prompt([
            {
                type: 'list',
                name: 'selectedEmail',
                message: 'Select an email:',
                choices,
            },
        ]);

        console.log(`Selected email: ${selectedEmail}`);
    } catch (error) {
        console.error(`An error occurred while displaying the email list: ${error}`);
    }
}

