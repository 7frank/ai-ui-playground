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

export async function userPrompt(message:string,options: string[]) {
  const res=await inquirer.prompt<{selection:string}>([
    {
      type: "list",
      name: "selection",
      message,
      choices: options,
    },
  ])
  return res.selection;
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
