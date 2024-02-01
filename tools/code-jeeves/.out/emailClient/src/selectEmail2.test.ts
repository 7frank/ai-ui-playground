

import { selectEmail2 } from './selectEmail2';

describe('selectEmail2', () => {
  it('should return the selected email when an array of emails is passed in', () => {
    const emails = [{}, {}] as Email[];
    const selectedEmail = { subject: 'test email', body: 'this is a test email' };

    expect(selectEmail2(emails)).toEqual(selectedEmail);
  });

  it('should throw an error if the email array is empty', () => {
    const emails = [] as Email[];

    expect(() => selectEmail2(emails)).toThrow('No emails found');
  });

  it('should throw an error if the email array is not an array', () => {
    const emails = 'not an array' as unknown as Email[];

    expect(() => selectEmail2(emails)).toThrow('Emails must be an array');
  });
});
