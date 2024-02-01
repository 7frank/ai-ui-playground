
import { openEmail } from './openEmail.ts';

describe('openEmail', () => {
  const email = new Email();

  it('should open the selected email', () => {
    const result = openEmail(email);

    expect(result).toBe(true);
  });
  
  it('should return false if the email is not selected', () => {
    const result = openEmail(null);

    expect(result).toBe(false);
  });
  
  it('should throw an error if the email is not of type Email', () => {
    expect(() => {
      openEmail('invalid email');
    }).toThrow('Invalid email type');
  });
});
