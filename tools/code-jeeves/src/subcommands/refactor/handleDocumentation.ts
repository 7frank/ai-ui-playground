import { $, file } from "bun";
import { askOpenAI } from "../../askOpenAI";
import chalk from "chalk";
import { systemPrompt } from "../../../prompts";
import { fileSelectQuestion, confirmQuestion } from "../../../questions";

export async function handleDocumentation({
  pattern,
  isDry = false,
}: {
  pattern?: string;
  isDry: boolean;
}) {
  if (pattern == undefined) pattern = "*";

  const found =
    await $`find . -type d -name node_modules -prune -o -type f -name "${pattern}"`.text();
  const files = found.split("\n");

  const selectedFile =
    files.length == 1 ? files[0] : (await fileSelectQuestion(files)).fileName;

  const code = await $`cat ${selectedFile}`.text();

  const answer = await askOpenAI(systemPrompt, code);

  await $`echo ${answer} > ${file(selectedFile)}`; // .txt

  const commitMessage = `"jeeves: updating documentation for ${selectedFile}"`;

  const dryRun = isDry ? "--dry-run" : "";

  await $`git add ${selectedFile}`;

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
