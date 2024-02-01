


// IMPORTS
import { writeEmail3 } from './writeEmail3';

// TESTS
describe('writeEmail3', () => {
  // Test case 1
  it('should return a promise of type Email', () => {
    // ARRANGE
    // No further arrangement required as the function does not require any arguments.

    // ACT
    const result = writeEmail3();

    // ASSERT
    expect(result).toBeInstanceOf(Promise); // Checks if the result is a promise.
    expect(result).resolves.toBe('Email'); // Checks if the promise resolves to type Email.
  });

  // Test case 2
  it('should write an email', () => {
    // ARRANGE
    // No further arrangement required as the function does not require any arguments.

    // ACT
    const result = writeEmail3();

    // ASSERT
    expect(result).resolves.toEqual('Email'); // Checks if the promise resolves to the correct output.
  });

  // Test case 3
  it('should be imported from .ts file', () => {
    // ARRANGE
    const expected = writeEmail3;

    // ACT
    const actual = require('./writeEmail3.ts').writeEmail3;

    // ASSERT
    expect(actual).toBe(expected); // Checks if the imported function is the same as the declared function.
  });
});
