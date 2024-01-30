import { $, file } from "bun";
import { askOpenApiStructured } from "../../askOpenAI";
import chalk from "chalk";

import { fileSelectQuestion, confirmQuestion } from "../../questions";
import path from "node:path";
import fs from "node:fs";

import { PlanResponseSchema } from "../../types/taskFileSchema";
import { jeevesSpecification } from "../../../jeevesSpecification";

import type { GenerateCommandParams } from "./plan";

export async function generatePlan({ name }: GenerateCommandParams) {
  name = path.normalize(name) + "/";

  await $`mkdir -p ${name}src`;

  const tasksDefinitionFilePath = name + "plan.json";
  console.log(tasksDefinitionFilePath);

  if (fs.existsSync(tasksDefinitionFilePath)) {
    console.log(
      "skipped generating plan. already exists:",
      tasksDefinitionFilePath,
    );
    return;
  }
  const { problemStatement } = jeevesSpecification();

  const res = await askOpenApiStructured(
    "",
    problemStatement, //  "Generate a step by step plan on how to run a hackathon",
    PlanResponseSchema,
  );

  // Convert the result to JSON
  const jsonOutput = JSON.stringify(res, null, 2);

  await $`mkdir -p ${name}`;

  const tasksFilePath = path.normalize(name + "plan.json");
  await $`echo ${jsonOutput} > ${file(tasksFilePath)}`;
}
