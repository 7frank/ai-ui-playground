import enquirer from "enquirer";


export async function comnfirmProceedPrompt() {
  return (
    await enquirer.prompt<{ val: boolean; }>({
      type: "confirm",
      name: "val",
      message: `Do you want to proceed?`,
    })
  ).val;
}

export async function selectTemplatePrompt(choices: string[]) {
  return (
    await enquirer.prompt<{ value: string; }>({
      type: "select",
      name: "value",
      message: "Choose a template",
      choices,
    })
  ).value;
}
