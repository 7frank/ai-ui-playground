import { $, file } from "bun";
import { askOpenAI, askOpenApiStructured } from "./src/askOpenAI";
import chalk from "chalk";
import {camelCase} from "lodash-es"

import { fileSelectQuestion, confirmQuestion } from "./questions";
import path from "node:path";
import fs from "node:fs";

import { planResponseSchema } from "./taskFileSchema";

export async function generateProgramList({ name }: { name: string }) {
  name = path.normalize(name) + "/";

  await $`mkdir -p ${name}src`;

  const tasksDefinitionFilePath = name + "plan.json";

  if (!fs.existsSync(tasksDefinitionFilePath))
    await createProjectAndTasks({ name });

  const tasks = await $`cat ${tasksDefinitionFilePath}`.json();

  const parsed = planResponseSchema.parse(tasks);


  for await (const { task,reason } of parsed.plan) {

    const role = "You are a 10x developer.";

    const onlyCode = "Return only the source code and no explanations.";

    const prompts = [
      "create a function,the full implementation, dont abreviate",
      "use typescript",
    ];

    const systemPrompt = `
        ${role} ${prompts.join("\n")}  ${onlyCode}`;

    const res = await askOpenAI(systemPrompt, task);

    const functionName=camelCase(reason)

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

  // TODO


  const res = await askOpenApiStructured("",
    "Generate a step by step plan on how to run a hackathon",
    planResponseSchema,
  );

  // Convert the result to JSON
  const jsonOutput = JSON.stringify(res, null, 2);

  await $`mkdir -p ${name}`;

  const tasksFilePath = path.normalize(name + "plan.json");
  await $`echo ${jsonOutput} > ${file(tasksFilePath)}`;
}

