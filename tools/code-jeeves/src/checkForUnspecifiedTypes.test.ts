import { checkForUnspecifiedTypes } from "./typescriptTypecheckUtils";

describe('checkForUnspecifiedTypes', () => {
  test('should detect unspecified interfaces or types', () => {
    const code = `const foo: FOO`;
    expect(checkForUnspecifiedTypes(code)).toEqual(['FOO']);
  });


  test('should not detect specified interfaces', () => {
    const code = `
      interface SpecifiedInterface {
        property: string;
      }
    `;
    expect(checkForUnspecifiedTypes(code)).toEqual([]);
  });

  test('should not detect specified type aliases', () => {
    const code = `type SpecifiedType = { property: string; };`;
    expect(checkForUnspecifiedTypes(code)).toEqual([]);
  });

  test('should detect mixed specified and unspecified types and interfaces', () => {
    const code = `
      interface SpecifiedInterface {
        property: string;
      }

      type SpecifiedType = { property: string; };

      const foo:UnspecifiedType
     
    `;
    expect(checkForUnspecifiedTypes(code)).toEqual(['UnspecifiedType']);
  });
});
