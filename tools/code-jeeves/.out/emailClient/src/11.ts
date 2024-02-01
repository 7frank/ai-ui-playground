

/**
 * This file contains the implementation of the selectEmail function using the inquirer package. 
 */

import * as inquirer from 'inquirer';

/**
 * Represents the preferences for the selectEmail function.
 */
type Preferences = {
    language: string;
    package: string;
}

/**
 * Represents the options for the selectEmail function.
 */
type Options = {
    language: string;
    package: string;
    preferences: Preferences
}

/**
 * Represents the interface for the selectEmail function.
 */
interface SelectEmailFn {
    (options: Options): void;
}

/**
 * Represents the function that prompts the user to select a preferred email.
 * @param options - The options object containing the preferences.
 */
const selectEmail: SelectEmailFn = (options) => {
    // Extract the preferences from the options object.
    const { preferences } = options;

    // Check if the preferences are valid.
    if (preferences.language !== 'cmd-ts' || preferences.package !== 'inquirer') {
        console.log('Invalid preferences.');
        return;
    }

    // Prompt the user to select a preferred email.
    inquirer.prompt({
        type: 'list',
        name: 'email',
        message: 'Select your preferred email.',
        choices: ['Gmail', 'Yahoo', 'Outlook', 'Other']
    }).then((answers) => {
        // Display the selected email to the user.
        console.log(`Your preferred email is ${answers.email}.`);
    }).catch((err) => {
        console.log(err);
    });
}

// Export the selectEmail function.
export default selectEmail;
