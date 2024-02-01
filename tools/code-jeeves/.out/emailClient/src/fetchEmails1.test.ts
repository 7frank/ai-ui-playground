
import { fetchEmails1 } from './fetchEmails1';

describe('fetchEmails1', () => {
  describe('when called', () => {
    let result: Promise<Email[]>;

    beforeAll(async () => {
      result = await fetchEmails1();
    });

    it('should return a promise', () => {
      expect(result).toBeInstanceOf(Promise);
    });

    it('the promise should resolve to an array of Email objects', async () => {
      const emails: Email[] = await result;
      expect(Array.isArray(emails)).toBe(true);
      expect(emails.length).toBeGreaterThan(0);
      emails.forEach((email) => {
        expect(email).toBeInstanceOf(Email);
      });
    });
  });

  describe('when an error occurs on the server', () => {
    let result: Promise<Email[]>;

    beforeAll(() => {
      jest.spyOn(fetchEmails1, 'fetch').mockRejectedValue(new Error('Server Error'));
      result = fetchEmails1();
    });

    it('should reject the promise with an error', async () => {
      await expect(result).rejects.toThrowError('Server Error');
    });
  });
});
