import { command, option, string, boolean, flag, number, union } from "cmd-ts";
import { generatePlan } from "./generatePlan";
import { executePlan } from "./executePlan";
import type { ParsingResult } from "cmd-ts/dist/cjs/argparser";

/**
 * we better might implement this for all commands that generate code.
 * the goal here is to create a commit history.
 * TODO the question is if this should be default true or false. and how the flag is named.
 */
const dryRun = flag({
  type: boolean,
  long: "dryRun",

  description: "git commit changes or use --dryRun",
});

export const generate = command({
  name: "generate",
  args: {
    name: option({
      type: string,
      long: "name",
      short: "n",
      description: "The folder name the plan is getting generated into.",
    }),
    dryRun,
  },
  handler: generatePlan,
});

const force = flag({
  type: boolean,
  long: "force",
  short: "f",
  description: "override previously generated files",
});

const resume = flag({
  type: boolean,
  long: "resume",
  short: "r",
  description: "resumes at the last file generated the previous run",
});

const indexFlag = option({
  type: string,
  long: "index",
  description:
    "specify the function name or the index of the single item in the plan you want to execute",
});

const executePlanArgs = {
  name: option({
    type: string,
    long: "name",
    short: "n",
    description: "The folder name the plan is getting generated into.",
  }),
  dryRun,
  force,
  resume,
  index: indexFlag,
};
export const executeCmd = command({
  name: "execute",
  args: executePlanArgs,
  handler: executePlan as any,
});

// Utility type to extract simpler types from cmd-ts complex types
type Simplify<T> = T extends {
  parse(context: any): Promise<ParsingResult<infer U>>;
}
  ? U
  : never;

type CommandParams<T> = {
  [P in keyof T]: Simplify<T[P]>;
};

export type ExecuteCommandParams = CommandParams<typeof executePlanArgs>;
