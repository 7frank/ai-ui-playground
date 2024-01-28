import { $ } from "bun";
import { askOpenAI } from "./src/askOpenAI";
import chalk from "chalk";

import { fileSelectQuestion, confirmQuestion } from "./questions";


import { z } from "zod";

const response1=
`1. Import the necessary libraries and modules for program execution.
2. Implement a function to create tests.
   - Define the function to take in a list of test parameters and return the generated tests.
   - Inside the function, utilize libraries or modules specific to test generation to create the desired tests.
3. Implement a function to create functions with OpenAI.
   - Connect to the OpenAI service using the provided async function "askOpenAI(systemPrompt, question) ".
   - Pass the desired system prompt and question to the "askOpenAI" function.
   - Retrieve the generated source code from the response.
4. Implement a function to execute functions and tests.
   - Define a function that takes in the generated code and executes it.
   - Utilize the appropriate method or mechanism based on the programming language in use to execute the code.
5. Implement a function to create AST functions.
   - Define a function that takes in code as input and uses a library or module related to Abstract Syntax Trees (AST).
   - Utilize the AST library or module to traverse the code and extract the desired functions or perform other operations.
6. Implement a function to take arguments, such as file paths.
   - Define a function that takes in arguments, such as file paths, and uses them to perform certain actions within the program.
   - Utilize the file path-related libraries or modules to access or manipulate files as needed based on the specified requirements.
7. Implement the main function or program logic.
   - Depending on the desired flow and interactions, define the main function or program logic to orchestrate the different steps.
   - Call the respective functions with the necessary parameters and handle their outputs as required.
8. Test the program.
   - Use sample inputs and expected outputs to test the functionality of the program.
   - Verify that the tests, functions, code extraction, and file manipulation are all working as intended.
9. Document the program and provide necessary documentation for future use or maintenance purposes.
   - Write detailed explanations and documentation for each step in the program, including function usage, input requirements, and expected outputs.
   - Include guidelines, examples, or other relevant information that may be helpful to users or developers.
`



export async function generateProgramList({
    name
}: {
    name: string;
}) {
   
    const role = "You are a 10x developer.";

    const onlyCode = "Return only the markdown code and no explanations.";


    const prompts = [""];
   
    const systemPrompt =  `
    ${role}
    You have an existing function to connect to openai, ("async function askOpenAI(systemPrompt:string ,question:string):Promise<string>") that returns a string containing the source code for the question asked. 
        ${prompts.join("\n")}  ${onlyCode}`;

        const theQuestion= `Write a list of steps for a program that can do the following:
        - it can create tests.
        - it can create functions for those tests with OpenAI. 
        - it can execute functions and tests
        - it can create AST functions that traverse code and, for example, extract certain functions. 
        - it can take arguments, for example, to file paths that it uses to create a new function.
        
        Specify the steps to create a program. 
        Use the following tools if you ahve to choose: cmd-ts,bun shell, inquirer, zod
        `

  // const res=await askOpenAI(systemPrompt,theQuestion )

   // console.log(res)

  const result= convertListToTasks(response1)

       // Convert the result to JSON
       const jsonOutput = JSON.stringify(result, null, 2);
    
       // Print the JSON
       console.log(jsonOutput);

}




const subtaskSchema = z.object({
    description: z.string(),
  });
  
  const taskSchema = z.object({
    description: z.string(),
    subtask: z.array(subtaskSchema).optional(),
  });
  

function convertListToTasks(inputText: string){


    const lines = inputText.trim().split('\n');

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
          const subtask = { description: line.trim().substring(5) };
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
    
return result

}
