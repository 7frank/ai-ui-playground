
import { getCharacterByName, StarWarsCharacterDetails } from './getCharacterByName';

describe('getCharacterByName', () => {
  it('should return the character details when the character exists', async () => {
    const characterName = 'Luke Skywalker';
    const characterDetails: StarWarsCharacterDetails = await getCharacterByName(characterName);
    expect(characterDetails).toBeDefined();
    expect(characterDetails.name).toBe(characterName);
    expect(characterDetails.height).toBeDefined();
    expect(characterDetails.mass).toBeDefined();
  });

  it('should throw an error when the character does not exist', async () => {
    const characterName = 'Nonexistent Character';
    await expect(getCharacterByName(characterName)).rejects.toThrow('Character not found');
  });
});

