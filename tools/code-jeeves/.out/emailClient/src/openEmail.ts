

/** 
 * Interface representing an email.
 */
interface Email {
    subject: string;
    sender: string;
    message: string;
}

/**
 * Function that opens the selected email.
 * @param email - The email to be opened.
 */
export const openEmail = (email: Email) => {
    // Implementation goes here
};
