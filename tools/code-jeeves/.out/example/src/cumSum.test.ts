import { cumSum } from "./cumSum.ts";

describe("cumSum", () => {
  it("should return the sum of two numbers", () => {
    const result = cumSum(2, 3);
    expect(result).toEqual(5);
  });

  it("should return the sum of multiple numbers", () => {
    const result = cumSum(2, 3, 4, 5);
    expect(result).toEqual(14);
  });

  it("should return 0 if no arguments are provided", () => {
    const result = cumSum();
    expect(result).toEqual(0);
  });
});
