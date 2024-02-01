
// Import function
import displayEmails from './displayEmails';

// Declare test suite
describe('displayEmails function', () => {
  // Arrange
  // Create mock array of emails
  const emails: Email[] = [
    {
      from: 'john.doe@example.com',
      to: 'jane.doe@example.com',
      subject: 'Test Email',
      content: 'This is a test email.',
      date: '2021-10-01'
    },
    {
      from: 'jane.doe@example.com',
      to: 'john.doe@example.com',
      subject: 'Another Test Email',
      content: 'This is another test email.',
      date: '2021-10-02'
    }
  ];

  // Act
  // Call displayEmails function with mock emails
  const result = displayEmails(emails);

  // Assert
  // Test that result is not null
  it('should not return null', () => {
    expect(result).not.toBeNull();
  });

  // Test that result is an array
  it('should return an array', () => {
    expect(Array.isArray(result)).toBe(true);
  });

  // Test that result contains all emails
  it('should contain all emails', () => {
    expect(result).toHaveLength(emails.length);
  });
});
