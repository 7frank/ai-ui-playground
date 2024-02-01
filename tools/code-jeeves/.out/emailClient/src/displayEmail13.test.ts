
/* displayEmail13.ts */

import { displayEmail13 } from './displayEmail13';

describe('displayEmail13', () => {
  it('should be a function', () => {
    expect(typeof displayEmail13).toEqual('function');
  });
  
  const emailObj = {
    subject: 'My Email Subject',
    body: 'My Email Body',
    sender: 'My Email Sender',
    receiver: 'My Email Receiver'
  };
  
  it('should display the selected email', () => {
    // Arrange
    const email = emailObj;
    
    // Act
    const result = displayEmail13(email);
    
    // Assert
    expect(result).toBeUndefined();
  });
  
  it('should not display the email if the email object is empty', () => {
    // Arrange
    const email = {};
    
    // Act
    const result = displayEmail13(email);
    
    // Assert
    expect(result).toBeUndefined();
  });
  
  it('should throw an error if the email object is not of type Email', () => {
    // Arrange
    const email = 'Not an email object';
    
    // Act
    const result = () => {
      displayEmail13(email);
    };
    
    // Assert
    expect(result).toThrow();
  });
});
