import inquirer from "inquirer";

export async function fileSelectQuestion(fileNames: string[]) {
  return await inquirer.prompt([
    {
      type: "list",
      name: "fileName",
      message: "Select a file",
      choices: fileNames,
    },
  ]);
}

export async function userSelect(message: string, options: string[]) {
  const res = await inquirer.prompt<{ selection: string }>([
    {
      type: "list",
      name: "selection",
      message,
      choices: options,
    },
  ]);
  return res.selection;
}

export const confirmPrompt = async (
  question: string,
  _default = false,
  yes?: boolean,
) => {
  if (yes) return true;

  const response = await inquirer.prompt<{ answer: boolean }>([
    {
      type: "confirm",
      name: "answer",
      message: question,
      default: _default,
    },
  ]);
  return response.answer;
};

export async function confirmQuestion(msg: string) {
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
