

import { selectEmail11 } from './selectEmail11';

describe('selectEmail11 function', () => {
  it('should take in an array of emails and return a single email', () => {
    // Arrange
    const emails = [{ id: 1, subject: 'Hello', body: 'Hello, this is an email' }, { id: 2, subject: 'Reminder', body: 'This is a reminder' }, { id: 3, subject: 'Goodbye', body: 'Goodbye, have a nice day' }];
    
    // Act
    const result = selectEmail11(emails);

    // Assert
    expect(result).toEqual(expect.any(Promise));
  });

  it('should resolve to an email from the given array', () => {
    // Arrange
    const emails = [{ id: 1, subject: 'Hello', body: 'Hello, this is an email' }, { id: 2, subject: 'Reminder', body: 'This is a reminder' }, { id: 3, subject: 'Goodbye', body: 'Goodbye, have a nice day' }];
    
    // Act
    const result = selectEmail11(emails);

    // Assert
    return expect(result).resolves.toEqual(expect.any(Object));
  });

  it('should throw an error if the given array is empty', () => {
    // Arrange
    const emails = [];

    // Act
    const result = selectEmail11(emails);

    // Assert
    expect(result).rejects.toThrow(Error);
  });
}); 
