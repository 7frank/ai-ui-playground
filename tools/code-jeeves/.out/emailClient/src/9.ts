

/**
 * Imports the bun package for displaying emails.
 */
import bun from 'cmd-ts';

/**
 * Defines the interface for an email.
 */
interface Email {
    sender: string;
    recipient: string;
    subject: string;
    message: string;
}

/**
 * Defines the type for an array of emails.
 */
type EmailList = Email[];

/**
 * Displays the emails in the email list using the bun package.
 * @param emailList The list of emails to be displayed.
 */
export function displayEmails(emailList: EmailList): void {
    bun.display(emailList);
}
