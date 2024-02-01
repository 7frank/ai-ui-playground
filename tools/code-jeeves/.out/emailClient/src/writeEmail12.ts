

/**
 * A function that generates an email promise.
 *
 * @async
 * @returns A promise that resolves to an email object.
 */
export function writeEmail12(): Promise<Email> {
  /**
   * A utility function to get the user's email address.
   *
   * @async
   * @returns A promise that resolves to the user's email address.
   */
  async function getUserEmail(): Promise<string> {
    const { email } = await inquirer.prompt({
      type: 'input',
      message: 'What is your email address?',
      name: 'email',
      validate: function (input) {
        if (input.length === 0) {
          return 'Please enter your email address.';
        }
        return true;
      }
    });
    return email;
  }
  /**
   * A utility function to get the subject of the email.
   *
   * @async
   * @returns A promise that resolves to the email subject.
   */
  async function getEmailSubject(): Promise<string> {
    const { subject } = await inquirer.prompt({
      type: 'input',
      message: 'What is the subject of your email?',
      name: 'subject',
      validate: function (input) {
        if (input.length === 0) {
          return 'Please enter a subject for your email.';
        }
        return true;
      }
    });
    return subject;
  }
  /**
   * A utility function to get the body of the email.
   *
   * @async
   * @returns A promise that resolves to the email body.
   */
  async function getEmailBody(): Promise<string> {
    const { body } = await inquirer.prompt({
      type: 'input',
      message: 'What do you want to write in your email?',
      name: 'body',
      validate: function (input) {
        if (input.length === 0) {
          return 'Please write something in your email.';
        }
        return true;
      }
    });
    return body;
  }

  return new Promise<Email>(async (resolve, reject) => {
    try {
      const email: Email = {
        from: await getUserEmail(),
        subject: await getEmailSubject(),
        body: await getEmailBody()
      };
      resolve(email);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * An interface representing an email.
 */
interface Email {
  from: string;
  subject: string;
  body: string;
}
