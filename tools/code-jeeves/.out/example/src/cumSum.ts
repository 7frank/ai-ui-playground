export function cumSum(...values: number[]): number {
  return values.reduce((total, num) => total + num, 0);
}
