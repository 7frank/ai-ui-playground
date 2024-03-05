import { command, run, binary, subcommands } from "cmd-ts";
import { GenerateCommandArgs, generateHandler } from "./src/GenerateCommandArgs";

const generate = command({
  name: "template generator",
  args: GenerateCommandArgs,
  handler: generateHandler,
});

const mainCmd = subcommands({
  name: "farm - huggingface docker / k8s management",
  description: "-",
  cmds: { generate, g: generate },
});

run(binary(mainCmd), process.argv);
