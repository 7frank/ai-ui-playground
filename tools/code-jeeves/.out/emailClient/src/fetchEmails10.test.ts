
import { fetchEmails10 } from './fetchEmails10';
import { Email } from './email';

const testEmails: Email[] = [
  { id: 1, sender: 'John', receiver: 'Jane', subject: 'Test email 1', content: 'This is a test email 1.' },
  { id: 2, sender: 'Jane', receiver: 'John', subject: 'Test email 2', content: 'This is a test email 2.' },
  { id: 3, sender: 'John', receiver: 'Jane', subject: 'Test email 3', content: 'This is a test email 3.' },
];

describe('fetchEmails10', () => {
  it('should be a function', () => {
    expect(typeof fetchEmails10).toBe('function');
  });

  it('should return a promise', () => {
    expect(fetchEmails10() instanceof Promise).toBe(true);
  });

  it('should fetch emails from the server', async () => {
    const emails: Email[] = await fetchEmails10();
    expect(emails).toEqual(testEmails);
  });
});
