import {
  command,
  option,
  string,
  boolean,
  flag,
  number,
  union,
  optional,
} from "cmd-ts";
import { generatePlan } from "./generatePlan";
import { executePlan } from "./executePlan";
import type { CommandParams } from "../../cmd-types";

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

const generatePlanArgs = {
  name: option({
    type: string,
    long: "name",
    short: "n",
    description: "The folder name the plan is getting generated into.",
  }),
  dryRun,
};

export type GenerateCommandParams = CommandParams<typeof generatePlanArgs>;

export const generateCmd = command({
  name: "generate",
  args: generatePlanArgs,
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

const indexOption = option({
  type: optional(string),
  long: "index",
  short: "i",
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
  index: indexOption,
};

export type ExecuteCommandParams = CommandParams<typeof executePlanArgs>;

export const executeCmd = command({
  name: "execute",
  args: executePlanArgs,
  handler: executePlan,
});
