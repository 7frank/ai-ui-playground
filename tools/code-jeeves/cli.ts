import yargs, { Argv } from "yargs";
import { hideBin } from "yargs/helpers";

import { executePlan } from "./src/subcommands/plan/executePlan";
import { generatePlan } from "./src/subcommands/plan/generatePlan";
import { outlineArchitecture } from "./src/subcommands/plan/outlineArchitecture";

import { handleDocumentation } from "./src/subcommands/refactor/handleDocumentation";
import { userPrompt, userSelect, confirmPrompt } from "./src/questions";
import { $, file } from "bun";
import { createShellPrompt } from "./src/lc/createShellPrompt";
import { z } from "zod";

const shSubCmds = (yargs: Argv) => {
  return yargs.command({
    command: "exec [options]",
    describe: "Generate documentation",
    builder: (yargs) =>
      yargs.options({
        question: {
          alias: "q",
          describe: "pass a question as string",
          type: "string",
        },
        list: {
          alias: "l",
          describe: "use '*' for any",
          type: "boolean",
        },
      }),
    handler: async (argv) => {
      const logFilename = ".shelli.ndjson";

      const HistoryLine = z.object({ question: z.string(), cmd: z.string() });
      type HistoryLine = z.infer<typeof HistoryLine>;
      if (argv.list) {
        const historyData = await $`cat ${logFilename}`.text();
        const history = historyData
          .split("\n")
          .map(it=>it.trim())
          .filter(it=> { return !!it})
          .map<HistoryLine>((it) => HistoryLine.parse(JSON.parse(it)))
          .map((it) => it.cmd);

        const cmd = await userSelect(
          "select and run a command from history.",
          history
        );
        await $`sh -c ${cmd}`;
        return;
      }

      const question = argv.question ?? await userPrompt("what do you want to do?");
      const cmd = await createShellPrompt(question);
      console.log("Command:", cmd);
      const runShellCommand = await confirmPrompt("Do you want to run it now?");

      if (!runShellCommand) return;
      await $`sh -c ${cmd}`;

      const shellHistoryEntry = JSON.stringify({ question, cmd });

      await $`echo ${shellHistoryEntry} >> ${file(logFilename)}`;
    },
  });
};

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
      command: "architect [options]",
      describe: "outline an architecture for a problem",
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
          sm: {
            describe: "if set will prompt you for which model to use",
            type: "boolean",
            default: false,
          },
        }),
      handler: async (argv) => {
        await outlineArchitecture(argv);
      },
    })
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
  .command("sh <command>", "Shell operations", shSubCmds)
  .help()
  .showHelpOnFail(true)
  .completion()
  .wrap(null)
  .parse();
