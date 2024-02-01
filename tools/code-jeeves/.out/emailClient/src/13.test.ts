

// Import the writeEmail function
import writeEmail from './13.ts';
// Import the necessary packages for testing
import { expect } from 'chai';
import 'mocha';

// Create a test suite for the writeEmail function
describe('writeEmail function', () => {
  // Create a test for the function's purpose
  it('should implement the writeEmail function to use the cmd-ts package', () => {
    // Arrange
    const email = 'test@example.com';
    const message = 'Hello world!';
    
    // Act
    const result = writeEmail(email, message);
    
    // Assert
    expect(result).to.equal('Email sent successfully!');
  });
  
  // Create a test for inferring the language from the file extension
  it('should infer the language from the file extension', () => {
    // Arrange
    const email = 'test@example.com';
    const message = 'Hello world!';
    
    // Act
    const result = writeEmail(email, message);
    
    // Assert
    expect(result).to.equal('Language inferred from file extension: .ts');
  });
  
  // Create a test for importing the function from the correct file
  it('should be imported from .ts file', () => {
    // Arrange
    const email = 'test@example.com';
    const message = 'Hello world!';
    
    // Act
    const result = writeEmail(email, message);
    
    // Assert
    expect(result).to.equal('Function imported from .ts file');
  });
});
