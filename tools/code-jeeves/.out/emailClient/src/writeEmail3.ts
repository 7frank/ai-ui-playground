
/**
 * A function that writes an Email
 * @returns A Promise that resolves to an Email object
 */
export function writeEmail3(): Promise<Email> {
    // Import the inquirer library
    const inquirer = require('inquirer');
    
    // Define the Email interface
    interface Email {
        to: string;
        from: string;
        subject: string;
        body: string;
    }
    
    // Prompt the user to enter the email details
    return inquirer.prompt([
        {
            type: 'input',
            name: 'to',
            message: 'Recipient:',
        },
        {
            type: 'input',
            name: 'from',
            message: 'Sender:',
        },
        {
            type: 'input',
            name: 'subject',
            message: 'Subject:',
        },
        {
            type: 'input',
            name: 'body',
            message: 'Body:',
        }
    ]).then((answers: any) => {
        // Create an Email object with the user's input
        const email: Email = {
            to: answers.to,
            from: answers.from,
            subject: answers.subject,
            body: answers.body
        }
        return email;
    }).catch((error: any) => {
        console.log(error);
    });
}
