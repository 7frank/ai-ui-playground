import { $, file } from "bun";
import {
  askOpenAI,
  askOpenApiStructured,
  askOpenApiStructured2,
} from "../../askOpenAI";
import chalk from "chalk";

import { fileSelectQuestion, confirmQuestion } from "../../questions";
import path from "node:path";
import fs from "node:fs";

import { PlanResponseSchema } from "../../types/taskFileSchema";

import type { GenerateCommandParams } from "./plan";
import { JeevesSpecificationSchema } from "../../types/specSchema";
import { findNearestFileDirectory } from "../../findNearest";

import specFunction, { ArchitectureResponse } from "../../specs/betterSpec";
import { z } from "zod";

export async function outlineArchitecture({
  name,
  spec,
}: GenerateCommandParams) {
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

  // TODO define schema and version
  // const specFunction = require(s);
  //  const { problemStatement } = JeevesSpecificationSchema.parse(
  //   specFunction.default(),
  // );

  // const res = await askOpenApiStructured(
  //   "",
  //   problemStatement, //  "Generate a step by step plan on how to run a hackathon",
  //   PlanResponseSchema,
  // );

  const ss = specFunction();

  const res = await askOpenApiStructured2(ss.problemStatement, {
    schema: ArchitectureResponse,
    systemMessage: ss.system + " Constraints:" + ss.constraints,
  });

  // Convert the result to JSON
  const jsonOutput = JSON.stringify(res.data, null, 2);

  await $`mkdir -p ${name}`;

  const tasksFilePath = path.normalize(name + "architecture.json");
  await $`echo ${jsonOutput} > ${file(tasksFilePath)}`;
}
