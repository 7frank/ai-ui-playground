 

import { selectEmail } from './selectEmail';
import { Email } from './Email';

describe('selectEmail', () => {
    let emails: Email[];
    beforeEach(() => {
        emails = [
            {
                id: 1,
                sender: 'test1@test.com',
                content: 'Test email 1'
            },
            {
                id: 2,
                sender: 'test2@test.com',
                content: 'Test email 2'
            },
            {
                id: 3,
                sender: 'test3@test.com',
                content: 'Test email 3'
            }
        ];
    });

    it('should return the selected email from the list', () => {
        const selectedEmail = selectEmail(emails, 2);
        expect(selectedEmail).toEqual(emails[1]);
    });

    it('should throw an error if the email id is not present in the list', () => {
        expect(() => selectEmail(emails, 4)).toThrowError('Email not found!');
    });

    it('should not change the original list of emails', () => {
        const originalEmails = [...emails];
        selectEmail(emails, 2);
        expect(emails).toEqual(originalEmails);
    });
});
