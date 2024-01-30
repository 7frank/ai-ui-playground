import { $, file } from "bun";
import { askOpenAI, askOpenApiStructured } from "./src/askOpenAI";
import chalk from "chalk";

import { fileSelectQuestion, confirmQuestion } from "./questions";
import path from "node:path";
import fs from "node:fs";

import { planResponseSchema } from "./taskFileSchema";
import { jeevesSpecification } from "./jeevesSpecification";
import { executePlan } from "./executePlan";

export async function generatePlan({ name }: { name: string }) {
  name = path.normalize(name) + "/";

  await $`mkdir -p ${name}src`;

  const tasksDefinitionFilePath = name + "plan.json";

  if (fs.existsSync(tasksDefinitionFilePath))
  {
  console.log("skipped generating plan. already exists:",tasksDefinitionFilePath)
    return
  }
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


