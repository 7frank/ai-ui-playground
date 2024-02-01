
// 12.ts

// Import the function
import { writeEmails } from './12.ts';

// Utility function to get the number of emails
function countEmails(emails: string[]): number {
    return emails.length;
}

// Tests for the writeEmails function
describe('writeEmails', () => {
    // Test 1: Checks if the function is defined
    it('should be defined', () => {
        expect(writeEmails).toBeDefined();
    });

    // Test 2: Checks if the function returns the correct number of emails
    it('should return the correct number of emails', () => {
        // Arrange
        const emails: string[] = ['john@example.com', 'jane@example.com', 'bob@example.com'];

        // Act
        const result: number = writeEmails(emails);

        // Assert
        expect(result).toEqual(countEmails(emails));
    });

    // Test 3: Checks if the function throws an error when given an empty array
    it('should throw an error when given an empty array', () => {
        // Arrange
        const emails: string[] = [];

        // Act & Assert
        expect(() => writeEmails(emails)).toThrow('Cannot write emails with an empty array');
    });
});
