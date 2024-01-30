import { createSumFunction } from './createSumFunction';

describe('createSumFunction', () => {
  it('should sum up two or more numbers', () => {
    expect(createSumFunction(1, 2)).toBe(3);
    expect(createSumFunction(1, 2, 3)).toBe(6);
    expect(createSumFunction(1, 2, 3, 4)).toBe(10);
  });
});
