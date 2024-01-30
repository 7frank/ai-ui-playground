import { $, file } from "bun";
import { askOpenApiStructured } from "../../askOpenAI";
import chalk from "chalk";

import { fileSelectQuestion, confirmQuestion } from "../../questions";
import path from "node:path";
import fs from "node:fs";

import { PlanResponseSchema } from "../../types/taskFileSchema";

import type { GenerateCommandParams } from "./plan";
import { JeevesSpecificationSchema } from "../../types/specSchema";
import { findNearestFileDirectory } from "../../findNearest";

export async function generatePlan({ name, spec }: GenerateCommandParams) {
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

  const fileDirectory = findNearestFileDirectory(process.cwd(), "package.json");
  const s = path.resolve(fileDirectory ?? "", spec);
  console.log(fileDirectory);
  if (!fs.existsSync(s)) {
    console.warn("spec file not found:", s);
    process.exit(1);
  }
  const specFunction = require(s);

  const { problemStatement } = JeevesSpecificationSchema.parse(
    specFunction.default(),
  );

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
