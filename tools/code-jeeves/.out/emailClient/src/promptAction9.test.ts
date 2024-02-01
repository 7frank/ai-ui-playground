

// Import the function from 'promptAction9.ts'
import { promptAction9 } from './promptAction9';
 
// Import the utility function
import { validateAction, validatePromise } from './utils';
 
describe('promptAction9', () => {
  // Test 1: Checks if the function is a Promise
  it('should return a Promise', () => {
    // Arrange
    const action = promptAction9();
    
    // Act
    const isPromise = validatePromise(action);
    
    // Assert
    expect(isPromise).toBeTruthy();
  });
  
  // Test 2: Checks if the function prompts the user for input
  it('should prompt the user for input', async () => {
    // Arrange
    const promptSpy = jest.spyOn(window, 'prompt');
    
    // Act
    await promptAction9();
    
    // Assert
    expect(promptSpy).toHaveBeenCalledTimes(1);
    expect(promptSpy).toHaveBeenCalledWith('Please enter your next action:');
  });
  
  // Test 3: Checks if the input is a valid action
  it('should validate the user input', async () => {
    // Arrange
    const userInput = 'do something';
    
    // Act
    await promptAction9();
    
    // Assert
    expect(validateAction(userInput)).toBeTruthy();
  });
});
