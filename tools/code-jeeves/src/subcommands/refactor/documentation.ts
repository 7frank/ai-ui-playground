import { command, optional, option, string, boolean, flag } from "cmd-ts";
import { handleDocumentation } from "./handleDocumentation";
import type { CommandParams } from "../../cmd-types";

/** TODO Deprecated */

const updateDocBlocksArgs = {
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
};

export type GenerateCommandParams = CommandParams<typeof updateDocBlocksArgs>;
