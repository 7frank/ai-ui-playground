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
