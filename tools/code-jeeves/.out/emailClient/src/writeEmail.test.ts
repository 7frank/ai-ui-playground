
import writeEmail from './writeEmail.ts';

const email = 'test@example.com';
const subject = 'Test Email';
const body = 'This is a test email.';

describe('Write Email', () => {
  it('should be a function', () => {
    expect(typeof writeEmail).toBe('function');
  });

  it('should send an email', () => {
    expect(writeEmail(email, subject, body)).toBeTruthy();
  });
  
  it('should return an error if no email address is provided', () => {
    expect(writeEmail('', subject, body)).toThrow(console.log('Please provide an email address.'));
  });
  
  it('should return an error if no subject is provided', () => {
    expect(writeEmail(email, '', body)).toThrow(console.log('Please provide a subject.'));
  });
  
  it('should return an error if no body is provided', () => {
    expect(writeEmail(email, subject, '')).toThrow(console.log('Please provide a body.'));
  });
});
