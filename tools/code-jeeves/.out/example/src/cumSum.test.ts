import { cumSum } from './cumSum';

// Positive test case
test('Sum up numbers', () => {
  expect(cumSum(1, 2, 3)).toBe(6);
});

// Negative test case
test('Invalid input', () => {
  expect(() => {
    cumSum(1, '2', 3);
  }).toThrow('Invalid input');
});
