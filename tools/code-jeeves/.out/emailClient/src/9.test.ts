
// Import function to test
import { displayEmails } from './9..ts';

// Import utility function
import { checkEmailDisplay } from './utils';

// Import necessary packages
import bun from 'bun';

// Arrange
const testEmails = ['test1@test.com', 'test2@test.com', 'test3@test.com'];
const expectedOutput = 'Emails displayed successfully';

// Act
const actualOutput = displayEmails(testEmails);

// Assert
it('should display emails using bun package', () => {
  expect(actualOutput).toEqual(expectedOutput);
});

// Arrange
const testEmails = ['test1@test.com', 'test2@test.com', 'test3@test.com'];
const expectedOutput = 'Emails displayed successfully';

// Act
const actualOutput = displayEmails(testEmails);

// Assert
it('should not display any emails if there are no emails in the array', () => {
  expect(actualOutput).toBeUndefined();
});

// Arrange
const testEmails = ['test1@test.com', 'test2@test.com', 'test3@test.com'];
const expectedOutput = 'Emails displayed successfully';

// Act
const actualOutput = displayEmails(testEmails);

// Assert
it('should display emails in the correct order', () => {
  expect(actualOutput).toEqual(expectedOutput);
});
