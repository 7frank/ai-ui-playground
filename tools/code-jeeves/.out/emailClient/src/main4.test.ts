
// Import the function from 'main4.ts'
import { main4 } from './main4';

// Import dependencies
import * as fs from 'fs';
import * as path from 'path';

// Function to get file extension
function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}

// BDD for naming 'describe' and 'it' blocks
describe('Main4 function', () => {
    test('should be a function', () => {
        expect(typeof main4).toBe('function');
    });

    test('should return a promise', () => {
        expect(main4() instanceof Promise).toBe(true);
    });

    test('should execute the email client', () => {
        // Arrange
        const expected = 'email client executed';
        const filePath = './main4.ts';
        const fileExtension = getFileExtension(filePath);
        const language = fileExtension === 'ts' ? 'typescript' : 'unknown';
        
        // Act
        const actual = main4();
        
        // Assert
        expect(actual).resolves.toEqual(expected);
        expect(language).toBe('typescript');
    });
});
