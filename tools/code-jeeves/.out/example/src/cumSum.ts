/**
 * This function calculates the cumulative sum of the given numbers.
 * @param values - The numbers to be summed up.
 * @returns The total sum of the given numbers.
 */
export function cumSum(...values: number[]): number {
  let total: number = 0;

  for (let value of values) {
    total += value;
  }

  return total;
}
