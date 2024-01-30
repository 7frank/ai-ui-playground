import { command, optional, option, string, boolean, flag } from "cmd-ts";
import { handleDocumentation } from "./handleDocumentation";

export const documentation = command({
  name: "documentation",
  args: {
    pattern: option({
      type: optional(string),
      long: "pattern",
      short: "p",
      description: "use '*' for any ",
    }),
    dryRun: flag({
      type: boolean,
      long: "dryRun",

      description: "git commit changes or use --dryRun",
    }),
  },
  handler: handleDocumentation,
});
