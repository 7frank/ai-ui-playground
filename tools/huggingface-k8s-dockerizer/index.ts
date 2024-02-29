import { command, run, binary, subcommands, option, string } from "cmd-ts";
import enquirer from "enquirer";
import { $ } from "bun";

const generate = command({
  name: "template generator",
  args: {
    pattern: option({
      type: string,
      long: "pattern",
      short: "p",
      defaultValue: () => "*",
      description: "Der Text der Geschichte",
    }),
  },
  async handler({ pattern }) {
    const templates = await $`ls -d templates/${pattern}`.text();

    // Parse the output to get directory names
    const choices = templates.trim().split("\n");

    // Use enquirer to let the user choose a template
    const response = await enquirer.prompt<{ value: string }>({
      type: "select",
      name: "value",
      message: "Choose a template",
      choices,
    });

    // // Execute the cookiecutter command with the selected template
    const templatePath = response.value;

    await $`pipx run cookiecutter --output-dir=".barn" --config-file barn/elevenlabs-tts.json ${templatePath}`;
  },
});


const mainCmd = subcommands({
  name: "farm - huggingface docker / k8s management",
  description: "-",
  cmds: { generate, g: generate },
});

run(binary(mainCmd), process.argv);

console.log("---");
