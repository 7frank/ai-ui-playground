
import { fetchEmails } from './6.ts';

describe('fetchEmails function', () => {
    it('should be a function', () => {
        expect(typeof fetchEmails).toBe('function');
    });

    it('should return an array of emails from the server', () => {
        const expected = ['example1@example.com', 'example2@example.com', 'example3@example.com'];
        const actual = fetchEmails();
        expect(actual).toEqual(expected);
    });

    describe('helper function', () => {
        it('should be a function', () => {
            expect(typeof helperFunction).toBe('function');
        });

        it('should not be exported', () => {
            expect(helperFunction).not.toBeDefined();
        });
    });
});

// helper function
const helperFunction = () => {
    // code to help with fetching emails
}
