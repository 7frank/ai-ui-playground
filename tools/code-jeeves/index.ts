import {
  command,
  binary,
  run,
  subcommands,
  optional,
  option,
  string,
  boolean,
  flag,
} from "cmd-ts";
import { $ } from "bun";
import inquirer from "inquirer";
import { askOpenAI } from "./src/askOpenAI";

import chalk from "chalk";

const role = "You are a 10x developer.";
const onlyCode = "Return only the generated code and no explanations.";

const documentCodePrompt =
  "Document the following source code and functions. Don't document obvious things.";
const today = new Date().toLocaleString().split(",")[0];
const commentOutDeadCode = `If some code is not used or exported then comment out this code. Prefix the comment with: '// Deprecated since: ${today}'`;
const optimizeCode =
  "Optimize the following source code and functions. Comment code that is not used out.";

const prompts = [documentCodePrompt, commentOutDeadCode, optimizeCode];

const systemPrompt = `${role} ${prompts.join("\n")}  ${onlyCode}`;

async function handler({
  pattern,
  isDry = false,
}: {
  pattern?: string;
  isDry: boolean;
}) {
  if (pattern == undefined) pattern = "*";

  const found =
    await $`find . -type d -name node_modules -prune -o -type f -name "${pattern}" | pv -p`.text();
  const files = found.split("\n");

  const selectedFile =
    files.length == 1 ? files[0] : (await fileSelectQuestion(files)).fileName;

  const code = await $`cat ${selectedFile}`.text();

  const answer = await askOpenAI(systemPrompt, code);

  await $`echo ${answer} > ${selectedFile}.txt`;

  const commitMessage = `"jeeves: updating documentation for ${selectedFile}"`;

  const dryRun = isDry ? "--dry-run" : "";

  console.log(chalk.green("git:"), `git commit -m ${commitMessage} ${dryRun}`);

  await $`git --no-pager diff ${selectedFile}`;

  if (await confirmQuestion("Do you want to commit changes?")) {
    const commitSuccess =
      await $`git commit -m ${commitMessage} ${dryRun}`.text();

    console.log(
      commitSuccess
        .split("\n")
        .map((it) => chalk.green("git:") + it)
        .join("\n"),
    );
  }
}

async function fileSelectQuestion(fileNames: string[]) {
  return await inquirer.prompt([
    {
      type: "list",
      name: "fileName",
      message: "Select a file",
      choices: fileNames,
    },
  ]);
}

async function confirmQuestion(msg: string) {
  return (
    await inquirer.prompt([
      {
        type: "confirm",
        name: "selection",
        message: msg,
        default: true,
      },
    ])
  ).selection;
}

const documentation = command({
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
  handler: handler,
});

const refactor = subcommands({
  name: "refactor",
  cmds: {
    documentation,
  },
});

const cli = subcommands({
  name: "cli",
  cmds: {
    refactor,
  },
});

run(binary(cli), process.argv);

// ####################################
//   import { readStreamToString, ReadStreamType } from "./types/ReadStreamType";
//   /**
//    *
//    * @param args This is our handler that takes the script argument & evaluates the input with that.
//    */
//   async function handler(args) {
//     if (args.verbose) console.info("args", args);

//     const t = await readStreamToString(args.path);

//     var func = new Function("return (" + args.script + ")").bind(t);

//     const res = func(t);

//     if (typeof res == "object") console.log(JSON.stringify(res, null, "  "));
//     else console.log(res);
//   }

//   const cli = command({
//     name: "cli",
//     args: {
//       path: positional({ type: ReadStreamType }),
//       script: option({
//         long: "script",
//         short: "s",
//         type: string,
//         description:
//           "use javascript, 'this' contains the files content e.g. -s '1+1' ",
//       }),
//       verbose: flag({
//         type: boolean,
//         long: "verbose",
//         short: "v",
//       }),
//     },
//     handler,
//   });

//   run(binary(cli), process.argv);

// #################################################

// import chalk from "chalk";

// import { log } from "./src/log";
// import { JSONType } from "./src/input/types/JsonType";
// import { TarGzType } from "./src/input/types/TarGzType";

// interface CLI {
//   config: JSON;
//   input?: FileDescriptorSubject;
//   pattern?: string;
// }

// const args: Record<keyof CLI, any> = {
//   config: positional({
//     type: JSONType,
//     description: "a typescript file that exports a 'Generator' configuration",
//   }),
//   input: option({
//     type: optional(TarGzType),
//     long: "input",
//     short: "i",
//     description:
//       "a tar gz file or url to such a file which will override the 'source' property of the configuration",
//   }),
//   pattern: option({
//     type: optional(string),
//     long: "pattern",
//     short: "p",
//     description: "applies this pattern and lists all files that match",
//   }),
// };

// async function handler({ config, input, pattern }: CLI) {
//   let generator: CookieGenerator;
//   try {
//     generator = cookieGeneratorSchema.parse(config);
//   } catch (e) {
//     console.log(chalk.red("The provided generator configuration is invalid:"));
//     console.log(
//       chalk.bgRed(
//         typeof config == "object" ? JSON.stringify(config, null, "  ") : config
//       )
//     );
//     console.log(chalk.red("The following syntax error was thrown:"));
//     console.log(chalk.bgRed(e.message));

//     process.exit(-1);
//   }

//   if (pattern) {

//     process.exit(0);
//   }

//   log(chalk.green("Let's a go!"));

// }

// const cli = command({
//   name: "code jeeves",
//   description:
//     "A utility that helps you generate code",
//   args,
//   handler: handler as any,
// });

// run(binary(cli), process.argv);
