import { checkCodeForFunctionsAndExports } from "./typescriptTypecheckUtils";


describe('checkCodeForFunctionsAndExports', () => {
    it('should throw an error if no functions are declared', () => {
        const code = `const a = 5;`;
        expect(() => checkCodeForFunctionsAndExports(code)).toThrow('The source code does not contain any function declarations.');
    });

    it('should throw an error if functions are declared but none are exported', () => {
        const code = `function test() {}; const x = function() {};`;
        expect(() => checkCodeForFunctionsAndExports(code)).toThrow('The source code does not contain any exported function.');
    });

    it('should not throw an error if at least one function is declared and exported', () => {
        const code = `export function test() {}; function nonExported() {};`;
        expect(() => checkCodeForFunctionsAndExports(code)).not.toThrow();
    });
});
