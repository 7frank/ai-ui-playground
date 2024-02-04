import yargs, { Argv } from "yargs";
import { hideBin } from "yargs/helpers";

import { executePlan } from "./src/subcommands/plan/executePlan";
import { generatePlan } from "./src/subcommands/plan/generatePlan";
import { handleDocumentation } from "./src/subcommands/refactor/handleDocumentation";

const refactorSubCmds = (yargs: Argv) => {
  return yargs.command({
    command: "documentation [options]",
    describe: "Generate documentation",
    builder: (yargs) =>
      yargs.options({
        pattern: {
          alias: "p",
          describe: "use '*' for any",
          type: "string",
        },
        dryRun: {
          describe: "git commit changes or use --dryRun",
          type: "boolean",
          default: false,
        },
      }),
    handler: async (argv) => {
      await handleDocumentation(argv);
    },
  });
};

const planSubCmds = (yargs: Argv) => {
  return yargs
    .command({
      command: "generate [options]",
      describe: "Generate a plan",
      builder: (yargs) =>
        yargs.options({
          name: {
            alias: "n",
            describe: "The folder name the plan is getting generated into.",
            type: "string",
            requiresArg: true,
            required: true,
          },
          spec: {
            alias: "s",
            describe: "a file path and name to a jeeves spec file",
            type: "string",
            default: "./src/specs/defaultSpecification.ts",
          },
          dryRun: {
            describe: "git commit changes or use --dryRun",
            type: "boolean",
            default: false,
          },
        }),
      handler: async (argv) => {
        await generatePlan(argv);
      },
    })
    .command({
      command: "execute [options]",
      describe: "Execute a plan",
      builder: (yargs) =>
        yargs.option({
          name: {
            alias: "n",
            describe: "The folder name the plan is getting generated into.",
            type: "string",
            requiresArg: true,
          },
          dryRun: {
            describe: "git commit changes or use --dryRun",
            type: "boolean",
            default: false,
          },
          force: {
            alias: "f",
            describe: "override previously generated files",
            type: "boolean",
          },
          resume: {
            alias: "r",
            describe: "resumes at the last file generated the previous run",
            type: "boolean",
          },
          index: {
            alias: "i",
            describe:
              "specify the function name or the index of the single item in the plan you want to execute",
            type: "string",
          },
        }),
      handler: async (argv) => {
        await executePlan(argv);
      },
    });
};
yargs(hideBin(process.argv))
  .scriptName("jee")
  .usage("$0 <cmd> [args]")
  // Refactor command group with documentation subcommand
  .command("refactor <command>", "Refactor operations", refactorSubCmds)
  // Plan command group with generate and execute subcommands
  .command("plan <command>", "Plan operations", planSubCmds)
  .help()
  .completion()
  .wrap(null)
  .parse();
