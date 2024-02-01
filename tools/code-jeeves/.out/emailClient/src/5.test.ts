
import { importPackages } from './5.ts';

describe('importPackages function', () => {
  it('should import the necessary packages in the main program file', () => {
    // Arrange
    const expected = 'All necessary packages have been imported successfully.';
    // Act
    const result = importPackages();
    // Assert
    expect(result).toEqual(expected);
  });

  it('should infer the language from the file extension', () => {
    // Arrange
    const expected = 'TypeScript';
    // Act
    const result = importPackages();
    // Assert
    expect(result).toContain(expected);
  });

  it('should be imported from \'./5.ts\'', () => {
    // Arrange
    const expected = 'function imported successfully';
    // Act
    const result = importPackages();
    // Assert
    expect(result).toContain(expected);
  });
});
