import {
  getCharacterByName,
  StarWarsCharacterDetails,
} from "./getCharacterByName";

describe("getCharacterByName", () => {
  it("returns the details of a Star Wars character by name", async () => {
    // Arrange
    const name = "Luke Skywalker";

    // Act
    const characterDetails: StarWarsCharacterDetails =
      await getCharacterByName(name);

    // Assert
    expect(characterDetails.name).toEqual(name);
    expect(characterDetails.height).toEqual("172");
    expect(characterDetails.mass).toEqual("77");
    expect(characterDetails.eyeColor).toEqual("blue");
    expect(characterDetails.hairColor).toEqual("blond");
  });

  it("throws an error if the response is not successful", async () => {
    // Arrange
    const name = "Invalid Name";

    // Act
    const getCharacter = async () => await getCharacterByName(name);

    // Assert
    await expect(getCharacter()).rejects.toThrowError(
      "Request failed with status code 404.",
    );
  });
});
