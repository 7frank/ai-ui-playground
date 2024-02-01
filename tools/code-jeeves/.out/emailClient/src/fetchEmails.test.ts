

import fetchEmails from './fetchEmails.ts';

describe('fetchEmails function', () => {

  it('should be an async function', () => {
    expect(fetchEmails).toBeInstanceOf(Function);
    expect(fetchEmails.constructor.name).toBe('AsyncFunction');
  });

  it('should return an array of emails when the server responds with a 200 status code', async () => {
    const emails = await fetchEmails();
    expect(emails).toBeInstanceOf(Array);
  });

  it('should throw an error when the server responds with a non-200 status code', async () => {
    try {
      await fetchEmails();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

});
