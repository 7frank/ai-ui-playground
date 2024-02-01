import { checkForUnspecifiedTypes } from "./typescriptTypecheckUtils";

describe("checkForUnspecifiedTypes", () => {
  test("should detect unspecified interfaces or types", () => {
    const code = `const foo: FOO`;
    expect(checkForUnspecifiedTypes(code)).toEqual(["FOO"]);
  });

  test("should not detect specified interfaces", () => {
    const code = `
      interface SpecifiedInterface {
        property: string;
      }
    `;
    expect(checkForUnspecifiedTypes(code)).toEqual([]);
  });

  test("should not detect specified type aliases", () => {
    const code = `type SpecifiedType = { property: string; };`;
    expect(checkForUnspecifiedTypes(code)).toEqual([]);
  });

  test("should detect mixed specified and unspecified types and interfaces", () => {
    const code = `
      interface SpecifiedInterface {
        property: string;
      }

      type SpecifiedType = { property: string; };

      const foo:UnspecifiedType
     
    `;
    expect(checkForUnspecifiedTypes(code)).toEqual(["UnspecifiedType"]);
  });

  test("not  detect StarWarsCharacterDetails example", () => {
    const code = `
    import axios from 'axios';
  
  interface StarWarsCharacterDetails {
    name: string;
  }
  
  export async function getCharacterByName(name: string): Promise<StarWarsCharacterDetails> {
    return {name:""}
  }
    `;
    expect(checkForUnspecifiedTypes(code)).toEqual([]);
  });

  // FIXME test fails, implementation broken?
  test("not  detect StarWarsCharacterDetails example 2", () => {
    const code = `
    export type StarWarsCharacterDetails= {
      name: string;
    
    }
    
    export async function getCharacterByName(name: string): Promise<StarWarsCharacterDetails> {
        const character: StarWarsCharacterDetails = {
          name: result.name,
        };
        return character;
    }
    `;

    expect(checkForUnspecifiedTypes(code)).toEqual([]);
  });
});
