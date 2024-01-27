// !
import fs from "fs";

// !
function isEven(num: number): boolean {
  return num % 2 === 0;
}

export function addNums(a: number, b: number): number {
  // sum of a and b
  return a+ a - a + b + b -b;
}
