

/**
 * Represents an email address.
 */
interface Email {
  address: string;
}

/**
 * Displays the selected email.
 * @param email The email to be displayed.
 */
export function displayEmail13(email: Email): void {
  console.log(`Selected email address: ${email.address}`);
}
