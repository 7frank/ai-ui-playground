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

import { handleDocumentation } from "./handleDocumentation";

import { generate, execute } from "./src/subcommands/plan";

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
  handler: handleDocumentation,
});

const refactor = subcommands({
  name: "refactor",
  cmds: {
    documentation,
  },
});

// generate plan from string or spec.json
// execute plan
//   - force .. start anew and override existing
//   - flag for not overriding existing
//   - continue .. <default> take last stored index and continue (allows to fix plan at current index)
//   - index allows to fix / debug / isolate.. specific index
//

// import project ... would import a path e.g. `**/*.(ts|md)` and generate a plan.json so that is can be used with the rest of the commands

// run .. test all or -i .. index
const plan = subcommands({
  name: "generate",
  cmds: {
    generate,
    execute,
  },
});

const cli = subcommands({
  name: "cli",
  cmds: {
    refactor,
    plan,
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
