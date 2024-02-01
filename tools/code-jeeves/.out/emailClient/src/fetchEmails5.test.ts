
import { fetchEmails5 } from './fetchEmails5';

describe('Fetch emails from the server', () => {
  it('should return a promise that resolves to an array of emails', () => {
    // Arrange
    const expected = ['email1', 'email2', 'email3'];

    // Act
    const result = await fetchEmails5();

    // Assert
    expect(result).toBeInstanceOf(Promise);
    expect(result).resolves.toEqual(expected);
  });

  it('should handle errors gracefully', () => {
    // Arrange
    const expected = 'Error fetching emails from server';

    // Act
    const result = await fetchEmails5();

    // Assert
    expect(result).rejects.toThrow(expected);
  });

  it('should reject the promise if the server is down', () => {
    // Arrange
    const expected = 'Server is down';

    // Act
    const result = await fetchEmails5();

    // Assert
    expect(result).rejects.toThrow(expected);
  });
});
