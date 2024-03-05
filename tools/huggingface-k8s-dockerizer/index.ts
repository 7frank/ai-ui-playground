import { command, run, binary, subcommands, option, string } from "cmd-ts";
import enquirer from "enquirer";
import { $ } from "bun";
import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";

const fg = require("fast-glob");

const generate = command({
  name: "template generator",
  args: {
    pattern: option({
      type: string,
      long: "pattern",
      short: "p",
      defaultValue: () => "*",
      description: "pattern of the templates which should be generated.",
    }),
  },
  async handler({ pattern }) {
    const templateRoot = "./templates/";

    const instancesRoot = "./barn/";

    const choices = fs.readdirSync(templateRoot);

    const selectedTemplate = (
      await enquirer.prompt<{ value: string }>({
        type: "select",
        name: "value",
        message: "Choose a template",
        choices,
      })
    ).value;

    // // Execute the cookiecutter command with the selected template
    const templatePath = templateRoot + selectedTemplate;

    const entries = fg
      .globSync([path.resolve(instancesRoot, pattern)])
      .map((it) => instancesRoot + path.basename(it));

    console.log(`selected Template: "${selectedTemplate}"`);
    console.log(
      `selected entries: \n${entries.map((it) => " > " + it).join("\n")}`
    );

    const confirmResponse = (
      await enquirer.prompt<{ val: boolean }>({
        type: "confirm",
        name: "val",
        message: `Do you want to proceed?`,
      })
    ).val;

    if (!confirmResponse) {
      console.log("Aborted by user");
      process.exit(0);
    }

    for await (const entry of entries) {
      console.log(chalk.green(entry));
      
      const args = `pipx run cookiecutter --output-dir=".barn" --directory ${templatePath} --replay-file ${entry} --overwrite-if-exists $(pwd)`;
      console.log(chalk.blue(args));
      await $`pipx run cookiecutter --output-dir=".barn" --directory ${templatePath} --replay-file ${entry} --overwrite-if-exists $(pwd)`.catch(
        console.error
      );
    }
  },
});

const mainCmd = subcommands({
  name: "farm - huggingface docker / k8s management",
  description: "-",
  cmds: { generate, g: generate },
});

run(binary(mainCmd), process.argv);
