import { binary, command, run, subcommands } from "cmd-ts";

import { generateCmd, executeCmd } from "./src/subcommands/plan/plan";
import { documentation } from "./src/subcommands/refactor/documentation";
import { subCommandsToExportScript } from "./autocomplete";
import { $ } from "bun";

const refactor = subcommands({
  name: "refactor",
  cmds: {
    documentation,
  },
});

// import project ... would import a path e.g. `**/*.(ts|md)` and generate a plan.json so that is can be used with the rest of the commands

// run .. test all or -i .. index
const plan = subcommands({
  name: "generate",
  cmds: {
    generate: generateCmd,
    execute: executeCmd,
  },
});

export const source = command({
  name: "source",
  args:{},
  description:"running this command will enable bash autocomplete (tab-tab) on the cmd line",
  handler: sourceHandler,
});

export 
const cli = subcommands({
  name: "jee",
  cmds: {
    source,
    refactor,
    plan,
  },
 
});

function sourceHandler(){
 const res= subCommandsToExportScript(cli)
console.log(res)
$`export FOO="BAR"`
}

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
