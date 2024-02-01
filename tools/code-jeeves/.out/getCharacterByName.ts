
import fetch from 'node-fetch';

export interface StarWarsCharacterDetails {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

export async function getCharacterByName(name: string): Promise<StarWarsCharacterDetails> {
  const response = await fetch(`https://swapi.dev/api/people/?search=${name}`);
  const data = await response.json();

  if (data.count === 0) {
    throw new Error('Character not found');
  }

  return data.results[0];
}

