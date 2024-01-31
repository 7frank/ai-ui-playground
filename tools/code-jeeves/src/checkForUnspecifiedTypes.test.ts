import { checkForUnspecifiedTypes } from "./typescriptTypecheckUtils";

describe('checkForUnspecifiedTypes', () => {
  test('should detect unspecified interfaces or types', () => {
    const code = `const foo: FOO`;
    expect(checkForUnspecifiedTypes(code)).toEqual(['FOO']);
  });


//   test('should not detect specified interfaces', () => {
//     const code = `
//       interface SpecifiedInterface {
//         property: string;
//       }
//     `;
//     expect(checkForUnspecifiedTypes(code)).toEqual([]);
//   });

//   test('should not detect specified type aliases', () => {
//     const code = `type SpecifiedType = { property: string; };`;
//     expect(checkForUnspecifiedTypes(code)).toEqual([]);
//   });

//   test('should detect mixed specified and unspecified types and interfaces', () => {
//     const code = `
//       interface SpecifiedInterface {
//         property: string;
//       }

//       type SpecifiedType = { property: string; };

//       const foo:UnspecifiedType
     
//     `;
//     expect(checkForUnspecifiedTypes(code)).toEqual(['UnspecifiedType']);
//   });

  test('not  detect StarWarsCharacterDetails example', () => {
    const code = `
    import axios from 'axios';
  
  interface StarWarsCharacterDetails {
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
    try {
      const response = await axios.get("https://swapi.dev/api/people/?search="+name);
      const character = response.data.results[0];
      return character;
    } catch (error) {
      throw new Error('Error retrieving character');
    }
  }
    `
    expect(checkForUnspecifiedTypes(code)).toEqual([]);
  });

  

});
