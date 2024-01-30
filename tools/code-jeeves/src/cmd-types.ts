import type { ParsingResult } from "cmd-ts/dist/cjs/argparser";

// Utility type to extract simpler types from cmd-ts complex types
type Simplify<T> = T extends {
  parse(context: any): Promise<ParsingResult<infer U>>;
}
  ? U
  : never;
export type CommandParams<T> = {
  [P in keyof T]: Simplify<T[P]>;
};
