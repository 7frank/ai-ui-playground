
import {promptAction14} from './promptAction14.ts';
import {promises} from 'fs';

describe("promptAction14 function", () => {
  it("Should be a function", () => {
    expect(typeof promptAction14).toBe("function");
  });

  it("Should prompt the user for next action", () => {
    expect(promptAction14()).resolves.toBeUndefined();
  });

  it("Should return a Promise", () => {
    expect(promptAction14() instanceof Promise).toBeTruthy();
  });
});
