import { cumSum } from "./cumSum";

describe("cumSum", () => {
  const testCases: {
    input: number[];
    expected: number;
  }[] = [
    { input: [1, 2, 3], expected: 6 },
    { input: [-1, -2, -3], expected: -6 },
  ];

  testCases.forEach((testCase) => {
    test(`should return ${testCase.expected} when given ${testCase.input}`, () => {
      const result = cumSum(...testCase.input);
      expect(result).toBe(testCase.expected);
    });
  });
});
