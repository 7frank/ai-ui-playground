import { $, file } from "bun";
import { askOpenAI, askOpenApiStructured } from "./src/askOpenAI";
import chalk from "chalk";
import { camelCase } from "lodash-es";

import { fileSelectQuestion, confirmQuestion } from "./questions";
import path from "node:path";
import fs from "node:fs";

import { functionResponseSchema, planResponseSchema } from "./taskFileSchema";
import { jeevesSpecification } from "./jeevesSpecification";

export async function generateProgramList({ name }: { name: string }) {
  name = path.normalize(name) + "/";

  await $`mkdir -p ${name}src`;

  const tasksDefinitionFilePath = name + "plan.json";

  if (!fs.existsSync(tasksDefinitionFilePath))
    await createProjectAndTasks({ name });

  const tasks = await $`cat ${tasksDefinitionFilePath}`.json();

  const parsed = planResponseSchema.parse(tasks);

  for await (const { task, reason } of parsed.plan) {

    // const role = "You are a 10x developer.";

    // const onlyCode = "Return only the source code and no explanations.";

    // const prompts = [
    //   "create a function,the full implementation, dont abreviate",
    //   "use typescript",
    // ];

    // const systemPrompt = `
    //     ${role} ${prompts.join("\n")}  ${onlyCode}`;

    // const res = await askOpenAI(systemPrompt, task);


    // functionResponseSchema
    const res = await askOpenApiStructured("", task,functionResponseSchema);
    const functionName = camelCase(reason);

    const targetFileLocation = name + "src/" + functionName + ".ts";
    console.log(targetFileLocation);

    const json=JSON.stringify(res,null,'  ')
    
    await $`echo ${json} > ${file(targetFileLocation)}.json`;
    await $`echo ${res.sourceCode} > ${file(targetFileLocation)}`;
  }
}

export async function createProjectAndTasks({ name }: { name: string }) {
  const { problemStatement } = jeevesSpecification();

  const res = await askOpenApiStructured(
    "",
    problemStatement, //  "Generate a step by step plan on how to run a hackathon",
    planResponseSchema,
  );

  // Convert the result to JSON
  const jsonOutput = JSON.stringify(res, null, 2);

  await $`mkdir -p ${name}`;

  const tasksFilePath = path.normalize(name + "plan.json");
  await $`echo ${jsonOutput} > ${file(tasksFilePath)}`;
}
