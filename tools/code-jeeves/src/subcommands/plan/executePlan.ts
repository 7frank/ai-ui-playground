import { $, file } from "bun";
import { askOpenApiStructured } from "../../askOpenAI";
import { camelCase } from "lodash-es";
import {
  FunctionResponseSchema,
  PlanResponseSchema,
} from "../../../taskFileSchema";
import path from "node:path";
import type { ExecuteCommandParams } from "./plan";

const role = "You are a 10x developer.";
const prompts = [
  //  "create a function,the full implementation, dont abreviate",
  "Use typescript.",
];

// TODO the language that is used to generate tasks should come from the plan itself
const preamble = `
        ${role} ${prompts.join("\n")} `;

export async function executePlan({
  name,
  force,
  index,
  resume,
  dryRun,
}: ExecuteCommandParams) {
  if (dryRun) throw new Error("not implemented");

  name = path.normalize(name) + "/";

  const tasksDefinitionFilePath = name + "plan.json";
  console.log(tasksDefinitionFilePath);

  const planJson = await $`cat ${tasksDefinitionFilePath}`.json();

  const parsed = PlanResponseSchema.parse(planJson);

  if (force)
    for await (const plan of parsed.plan) {
      await executeSingleTask(plan, name);
    }
  else if (index) {
    let foundTask = findTaskByIndex(parsed, index);
    const singleFile = camelCase(foundTask.reason);
    console.log("updating", singleFile);

    await executeSingleTask(foundTask, name);
  } else if (resume) {
    const logLocation = name + "log.txt";
    const logText = await $`tail -n 1 ${logLocation}`.text();

    let logLine;
    try {
      logLine = JSON.parse(logText);
    } catch (e) {
      logLine = { index: 0 };
    }

    const resumeIndex = logLine.index ? parseInt(logLine.index) + 1 : 1;

    console.log("resuming tasks with:", resumeIndex);

    let foundTask = findTaskByIndex(parsed, resumeIndex);
    const singleFile = camelCase(foundTask.reason);
    console.log("updating", singleFile);

    await executeSingleTask(foundTask, name);
  }
}

function findTaskByIndex(parsed: PlanResponseSchema, index: number | string) {
  const indexAsNum = typeof index == "number" ? index : parseInt(index) - 1;

  if (!isNaN(indexAsNum)) {
    const foundTask = parsed.plan[indexAsNum];

    if (!foundTask) {
      console.log("could not find task by index");
      process.exit();
    }
    return foundTask;
  }

  const foundTask = parsed.plan.find((it) => camelCase(it.reason) == index);

  if (!foundTask) {
    console.log(
      "could not find task by name, valid values: ",
      parsed.plan
        .map((it) => camelCase(it.reason))
        .map((it) => `'${it}'`)
        .join(","),
    );
    process.exit();
  }
  return foundTask;
}

async function executeSingleTask(
  entry: PlanResponseSchema["plan"]["0"],
  name: string,
) {
  console.log(entry.reason);
  const res = await askOpenApiStructured(
    "",
    preamble + entry.task,
    FunctionResponseSchema,
  );
  const functionName = camelCase(entry.reason);

  const targetFileLocation = name + "src/" + functionName + ".ts";
  console.log(targetFileLocation);

  const json = JSON.stringify(res, null, "  ");

  await $`echo ${json} > ${file(targetFileLocation)}.json`;
  await $`echo ${res.sourceCode} > ${file(targetFileLocation)}`;

  const logLocation = name + "log.txt";
  const logJson = JSON.stringify(
    { functionName, index: parseInt(entry.id) },
    null,
    "",
  );
  await $`echo ${logJson} >> ${file(logLocation)}`;
}
