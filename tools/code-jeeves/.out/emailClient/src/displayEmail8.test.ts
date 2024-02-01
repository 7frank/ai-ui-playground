
import { displayEmail8 } from './displayEmail8';

describe('displayEmail8', () => {
  it('should display the selected email', () => {
    // Arrange
    const email = 'example@example.com';

    // Act
    displayEmail8(email);

    // Assert
    expect(console.log).toHaveBeenCalledWith(`Selected email: ${email}`);
  });

  it('should throw an error if the selected email is not valid', () => {
    // Arrange
    const email = 'example.com';

    // Act and Assert
    expect(() => displayEmail8(email)).toThrow('Invalid email.');
  });

  it('should not throw an error if the selected email is valid but empty', () => {
    // Arrange
    const email = '';

    // Act and Assert
    expect(() => displayEmail8(email)).not.toThrow();
  });
});
