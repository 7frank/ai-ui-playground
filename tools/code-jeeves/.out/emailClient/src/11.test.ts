


//Import necessary packages
const inquirer = require('inquirer');
const selectEmail = require('./11.ts');

//Describing function selectEmail
describe('selectEmail', () => {
    //Test 1: Checks if selectEmail is a function
    it('should be a function', () => {
        expect(typeof selectEmail).toBe('function');
    })
    
    //Test 2: Checks if selectEmail returns the correct email based on the file extension
    it('should return the correct email based on the file extension', async () => {
        //Arrange
        const fileExtension = '.ts';

        //Act
        const result = await selectEmail(fileExtension);

        //Assert
        expect(result).toBe('typescript@example.com');
    })

    //Test 3: Checks if selectEmail handles invalid file extensions
    it('should handle invalid file extensions', async () => {
        //Arrange
        const fileExtension = '.py';

        //Act
        const result = await selectEmail(fileExtension);

        //Assert
        expect(result).toBe('Invalid file extension!');
    })
})
