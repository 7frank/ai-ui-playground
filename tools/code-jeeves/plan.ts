import {
  command, option,
  string,
  boolean,
  flag
} from "cmd-ts";
import { generatePlan } from "./generatePlan";

export 
const plan = command({
  name: "plan",
  args: {
    name: option({
      type: string,
      long: "name",
      short: "n",
      description: "The folder name the plan is getting generated into.",
    }),
    dryRun: flag({
      type: boolean,
      long: "dryRun",

      description: "git commit changes or use --dryRun",
    }),
  },
  handler: generatePlan,
});
