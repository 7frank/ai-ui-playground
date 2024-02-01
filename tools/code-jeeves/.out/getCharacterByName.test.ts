

import { getCharacterByName } from './getCharacterByName.ts';

describe('getCharacterByName', () => {
  it('should return a character when given a valid name', async () => {
    // Arrange
    const name = 'Luke Skywalker';

    // Act
    const result = await getCharacterByName(name);

    // Assert
    expect(result).toBeDefined();
    expect(result.name).toEqual(name);
  });

  it('should throw an error when given an invalid name', async () => {
    // Arrange
    const name = 'Invalid Name';

    // Act
    const result = async () => await getCharacterByName(name);

    // Assert
    await expect(result).rejects.toThrow();
  });

  it('should return a character with all details when given a valid name', async () => {
    // Arrange
    const name = 'Darth Vader';

    // Act
    const result = await getCharacterByName(name);

    // Assert
    expect(result).toBeDefined();
    expect(result.name).toEqual(name);
    expect(result.height).toBeDefined();
    expect(result.mass).toBeDefined();
    expect(result.gender).toBeDefined();
    expect(result.homeworld).toBeDefined();
    expect(result.films).toBeDefined();
    expect(result.species).toBeDefined();
    expect(result.vehicles).toBeDefined();
    expect(result.starships).toBeDefined();
    expect(result.created).toBeDefined();
    expect(result.edited).toBeDefined();
    expect(result.url).toBeDefined();
  });
});
