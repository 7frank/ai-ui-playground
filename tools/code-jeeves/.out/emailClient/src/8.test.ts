
// Import the function from the specified file
import * as displayEmails from './8.ts';

// Create a test suite using the BDD approach
describe('displayEmails', () => {
  // Test case 1: Check if the function returns an array
  it('should return an array of emails', () => {
    // Arrange: Set up the input data
    const input = ['john@example.com', 'jane@example.com'];

    // Act: Call the function and store the result
    const result = displayEmails(input);

    // Assert: Check if the result is an array
    expect(Array.isArray(result)).toBe(true);
  });

  // Test case 2: Check if the function removes duplicates from the input array
  it('should remove duplicate emails from the input array', () => {
    // Arrange: Set up the input data with duplicate values
    const input = ['john@example.com', 'jane@example.com', 'john@example.com'];

    // Act: Call the function and store the result
    const result = displayEmails(input);

    // Assert: Check if the result has no duplicate values
    expect(result).toEqual(['john@example.com', 'jane@example.com']);
  });

  // Test case 3: Check if the function throws an error when the input is not an array
  it('should throw an error if the input is not an array', () => {
    // Arrange: Set up the input data as a string
    const input = 'john@example.com';

    // Act: Call the function and store the result
    const result = () => displayEmails(input);

    // Assert: Check if the function throws an error
    expect(result).toThrow();
  });
});
