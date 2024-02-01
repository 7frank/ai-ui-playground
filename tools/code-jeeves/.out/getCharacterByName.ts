/**
 * Gets the details of a Star Wars character by name.
 * @param name The name of the character to search for.
 * @returns A promise that resolves to the character's details.
 */
export async function getCharacterByName(
  name: string,
): Promise<StarWarsCharacterDetails> {
  // Define the base URL for the Star Wars API.
  const baseUrl = "https://swapi.dev/api/";

  // Construct the complete URL for the character search.
  const url = `${baseUrl}/people/?search=${name}`;

  // Use the fetch API to make a GET request to the URL.
  const response = await fetch(url);

  // Check if the response was successful.
  if (response.ok) {
    // Parse the response as JSON.
    const data = await response.json();

    // Get the first result from the results array.
    const result = data.results[0];

    // Extract the relevant information from the result.
    const { name, height, mass, eye_color, hair_color } = result;

    // Create a new StarWarsCharacterDetails object with the extracted information.
    const characterDetails: StarWarsCharacterDetails = {
      name,
      height,
      mass,
      eyeColor: eye_color,
      hairColor: hair_color,
    };

    // Return the character details.
    return characterDetails;
  } else {
    // If the response was not successful, throw an error with the status code.
    throw new Error(`Request failed with status code ${response.status}.`);
  }
}

/**
 * Interface for the details of a Star Wars character.
 */
interface StarWarsCharacterDetails {
  name: string;
  height: string;
  mass: string;
  eyeColor: string;
  hairColor: string;
}
