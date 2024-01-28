import { $, file } from "bun";
import { askOpenAI, askOpenApiStructured } from "./src/askOpenAI";
import chalk from "chalk";

import { fileSelectQuestion, confirmQuestion } from "./questions";
import path from "node:path";
import fs from "node:fs";

import { taskFileSchema, taskSchema, subtaskSchema } from "./taskFileSchema";
import { z } from "zod";

export async function generateProgramList({ name }: { name: string }) {
  name = path.normalize(name) + "/";

  await $`mkdir -p ${name}src`;

  const tasksDefinitionFilePath = name + "tasks.txt";

  if (!fs.existsSync(tasksDefinitionFilePath))
    await createProjectAndTasks({ name });

  const tasks = await $`cat ${tasksDefinitionFilePath}`.json();

  const parsed = taskFileSchema.parse(tasks);

  let functionName = 0;
  for await (const { description } of parsed) {
    functionName++;
    const role = "You are a 10x developer.";

    const onlyCode = "Return only the source code and no explanations.";

    const prompts = [
      "create a function,the full implementation, dont abreviate",
      "use typescript",
    ];

    const systemPrompt = `
        ${role} ${prompts.join("\n")}  ${onlyCode}`;

    const res = await askOpenAI(systemPrompt, description);

    const targetFileName = name + "src/" + functionName + ".ts";
    console.log(targetFileName);
    await $`echo ${res} > ${file(targetFileName)}`;
  }
}

export async function createProjectAndTasks({ name }: { name: string }) {
  const role = "You are a 10x developer.";

  const onlyCode = "Return only the markdown code and no explanations.";

  const oaiPrompt = ` You have an existing function to connect to openai, ("async function askOpenAI(systemPrompt:string ,question:string):Promise<string>") that returns a string containing the source code for the question asked. `;

  const prompts = [
    "",
    //oaiPrompt
  ];

  const systemPrompt = `
      ${role} ${prompts.join("\n")}  ${onlyCode}`;

  const theQuestion = `Write a list of steps for a program that can do the following:
          - it can create tests.
          - it can create functions for those tests with OpenAI. 
          - it can execute functions and tests
          - it can create AST functions that traverse code and, for example, extract certain functions. 
          - it can take arguments, for example, to file paths that it uses to create a new function.
          
          Specify the steps to create a program. 
          Each step should be implementable as a programm function.
          Use the following tools if you ahve to choose: cmd-ts,bun shell, inquirer, zod

          `;

  //'Generate a step by step plan on how to run a hackathon',

  const schema = z.object({
    plan: z.array(
      z.object({
        reason: z.string().describe("Name the reasoning for this step"),
        id: z.string().describe("Unique step id"),
        task: z.string().describe("What is the task to be done for this step?"),
      }),
    ),
  });

  const res = await askOpenApiStructured("",
    "Generate a step by step plan on how to run a hackathon",
    schema,
  );
  // const res = await askOpenAI(systemPrompt, theQuestion);

  //   const response1 = `1. Import the necessary libraries and modules for program execution.
  // 2. Implement a function to create tests.
  //    - Define the function to take in a list of test parameters and return the generated tests.
  //    - Inside the function, utilize libraries or modules specific to test generation to create the desired tests.
  // 3. Implement a function to create functions with OpenAI.
  //    - Connect to the OpenAI service using the provided async function "askOpenAI(systemPrompt, question) ".
  //    - Pass the desired system prompt and question to the "askOpenAI" function.
  //    - Retrieve the generated source code from the response.
  // 4. Implement a function to execute functions and tests.
  //    - Define a function that takes in the generated code and executes it.
  //    - Utilize the appropriate method or mechanism based on the programming language in use to execute the code.
  // 5. Implement a function to create AST functions.
  //    - Define a function that takes in code as input and uses a library or module related to Abstract Syntax Trees (AST).
  //    - Utilize the AST library or module to traverse the code and extract the desired functions or perform other operations.
  // 6. Implement a function to take arguments, such as file paths.
  //    - Define a function that takes in arguments, such as file paths, and uses them to perform certain actions within the program.
  //    - Utilize the file path-related libraries or modules to access or manipulate files as needed based on the specified requirements.
  // 7. Implement the main function or program logic.
  //    - Depending on the desired flow and interactions, define the main function or program logic to orchestrate the different steps.
  //    - Call the respective functions with the necessary parameters and handle their outputs as required.
  // 8. Test the program.
  //    - Use sample inputs and expected outputs to test the functionality of the program.
  //    - Verify that the tests, functions, code extraction, and file manipulation are all working as intended.
  // 9. Document the program and provide necessary documentation for future use or maintenance purposes.
  //    - Write detailed explanations and documentation for each step in the program, including function usage, input requirements, and expected outputs.
  //    - Include guidelines, examples, or other relevant information that may be helpful to users or developers.
  // `;

//   const result = convertListToTasks(res!);

  // Convert the result to JSON
  const jsonOutput = JSON.stringify(res, null, 2);


  await $`mkdir -p ${name}`;

  const tasksFilePath = path.normalize(name + "tasks.txt");
  await $`echo ${jsonOutput} > ${file(tasksFilePath)}`;
}

function convertListToTasks(inputText: string) {
  const lines = inputText.trim().split("\n");

  let result: any[] = [];
  let currentTask: any | null = null;

  // Validate and process input lines
  lines.forEach((line) => {
    if (line.match(/^\d+\./)) {
      // This is a task
      if (currentTask) {
        try {
          // Validate the current task
          taskSchema.parse(currentTask);
          result.push(currentTask);
        } catch (error) {
          console.error("Invalid task:", error);
        }
      }
      currentTask = { description: line.trim() };
    } else if (line.startsWith("   - ")) {
      // This is a subtask
      if (currentTask) {
        if (!currentTask.subtask) {
          currentTask.subtask = [];
        }
        const subtask = { description: line.trim().substring(2) };
        try {
          // Validate the subtask
          subtaskSchema.parse(subtask);
          currentTask.subtask.push(subtask);
        } catch (error) {
          console.error("Invalid subtask:", error);
        }
      }
    }
  });

  // Append the last task to the result
  if (currentTask) {
    try {
      // Validate the last task
      taskSchema.parse(currentTask);
      result.push(currentTask);
    } catch (error) {
      console.error("Invalid task:", error);
    }
  }

  return result;
}
