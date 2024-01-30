import { command, option, string, boolean, flag } from "cmd-ts";
import { generatePlan } from "./generatePlan";
import { executePlan } from "./executePlan";

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

export const execute = command({
  name: "execute",
  args: {
    name: option({
      type: string,
      long: "name",
      short: "n",
      description: "The folder name the plan is getting generated into.",
    }),
    dryRun,
  },
  handler: executePlan,
});
