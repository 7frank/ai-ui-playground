import { option, string } from "cmd-ts";
import { $ } from "bun";
import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";
import type { CommandParams } from "./cmd-types";
import fg from "fast-glob";
import { selectTemplatePrompt, comnfirmProceedPrompt } from "./prompts";

export const GenerateCommandArgs = {
  pattern: option({
    type: string,
    long: "pattern",
    short: "p",
    defaultValue: () => "*",
    description: "pattern of the templates which should be generated.",
  }),
};

export type GenerateCommandArgs = CommandParams<typeof GenerateCommandArgs>;
export async function generateHandler({ pattern }: GenerateCommandArgs) {
  const templateRoot = "./templates/";
  const instancesRoot = "./barn/";

  const choices = fs
    .readdirSync(templateRoot, { withFileTypes: true })
    .filter((it) => it.isDirectory())
    .map((it) => it.name);
  const selectedTemplate = await selectTemplatePrompt(choices);

  const patternPath = path.relative(
    ".",
    path.resolve(instancesRoot, selectedTemplate, pattern)
  );
  const entries = fg.globSync([patternPath]).map((it) => it);

  console.log(`selected Template: "${selectedTemplate}"`);
  console.log(
    `selected entries: \n${entries.map((it) => " > " + it).join("\n")}`
  );

  const confirmResponse = await comnfirmProceedPrompt();

  if (!confirmResponse) {
    console.log("Aborted by user");
    process.exit(0);
  }

  // // Execute the cookiecutter command with the selected template
  const templatePath = templateRoot + selectedTemplate;

  for await (const entry of entries) {
    console.log(chalk.green(entry));

    console.log(chalk.blue(`cp ${entry} ${templatePath}/cookiecutter.json`));
    await $`cp ${entry} ${templatePath}/cookiecutter.json`;

    const args = `pipx run cookiecutter --overwrite-if-exists --no-input --output-dir='.barn' ${templatePath}`;
    console.log(chalk.blue(args));
    await $`pipx run cookiecutter  --overwrite-if-exists --no-input --output-dir='.barn' ${templatePath}`.catch(
      console.error
    );
  }
}
