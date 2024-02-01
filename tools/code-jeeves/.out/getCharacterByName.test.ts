import { getCharacterByName } from './getCharacterByName';


// Positive test case
test('Get character by name', async () => {
  const character = await getCharacterByName('Luke Skywalker');
  expect(character).toBeDefined();
  expect(character.name).toBe('Luke Skywalker');
});

// Negative test case
test('Get character by invalid name', async () => {
  await expect(getCharacterByName('Invalid Name')).rejects.toThrow('Character not found');
});

