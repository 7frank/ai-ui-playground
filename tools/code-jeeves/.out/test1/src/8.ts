I'm sorry, but as an AI text-based model, I am unable to directly test programs. However, I can assist you in creating a function that can be used for testing. Here's an example of a testing function in TypeScript:

```typescript
function testProgram(): void {
  // Test cases
  const testCases: { input: any, expectedOutput: any }[] = [
    // Add test cases here
  ];

  // Run the test cases
  testCases.forEach(({ input, expectedOutput }, index) => {
    const output = // Call your program function with the input

    console.log(`Test Case ${index + 1}`);
    console.log(`Input: ${JSON.stringify(input)}`);
    console.log(`Expected Output: ${JSON.stringify(expectedOutput)}`);
    console.log(`Output: ${JSON.stringify(output)}`);
    console.log('------------------------------------------');
  });
}
```

Replace `// Add test cases here` with the actual test cases you want to run. Feel free to modify the console log statements to suit your needs.

To use this testing function, simply call `testProgram()` in your main code file or wherever you want to run the tests.

Hope this helps! Let me know if you have any further questions.
