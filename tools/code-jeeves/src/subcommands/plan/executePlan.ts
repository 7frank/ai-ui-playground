import { $, file } from "bun";
import { askOpenApiStructured } from "../../askOpenAI";
import { camelCase } from "lodash-es";
import {
  FunctionResponseSchema,
  PlanResponseSchema,
} from "../../types/taskFileSchema";
import path from "node:path";
import type { ExecuteCommandParams } from "./plan";
import * as fs from "node:fs";
import { createLcSourceCodeImpl, createLcTestCodeImpl } from "../../lc/createLcSourceCodeImpl";
import { getLanguageConfigFromTask } from "../../languageConfigurations";
import { runTestCommand } from "../../runTestCommand";

export async function executePlan({
  name,
  force,
  index,
  resume,
  dryRun,
}: ExecuteCommandParams) {
  if (dryRun) throw new Error("not implemented");

  name = path.normalize(name) + "/";

  await $`mkdir -p ${name}src`;

  const tasksDefinitionFilePath = name + "plan.json";
  console.log(tasksDefinitionFilePath);

  if (!fs.existsSync(tasksDefinitionFilePath)) {
    console.warn("File not found ", tasksDefinitionFilePath);
    process.exit(1);
  }
  const planJson = await $`cat ${tasksDefinitionFilePath}`.json();

  const parsed = PlanResponseSchema.parse(planJson);

  if (force)
    for await (const plan of parsed.plan) {
      await executeSingleTask(plan, name);
    }
  else if (index) {
    let foundTask = findTaskByIndex(parsed, index);
    const singleFile = camelCase(foundTask.id);
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

    // TODO resume will fail for freshly generated
    let previousTask = findTaskByIndex(parsed, logLine.index);
    let prevIndex = parsed.plan.findIndex((it) => previousTask == it);
    const resumeIndex = prevIndex + 1;

    console.log("resuming tasks with:", resumeIndex);

    let foundTask = findTaskByIndex(parsed, resumeIndex);
    const singleFile = camelCase(foundTask.id);
    console.log("resuming with:", singleFile);

    const subPlan = parsed.plan.slice(resumeIndex);
    for await (const plan of subPlan) {
      await executeSingleTask(plan, name);
    }
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

  // the index could be an id inferred from the reason or the id string
  const foundTask = parsed.plan.find((it) => camelCase(it.id) == index);

  if (!foundTask) {
    console.log(
      "could not find task by name, valid values: ",
      parsed.plan
        .map((it) => camelCase(it.id))
        .map((it) => `'${it}'`)
        .join(","),
    );
    process.exit();
  }
  return foundTask;
}

function createImplementationSystemPrompt(
  entry: PlanResponseSchema["plan"]["0"],
) {
  const role = "You are a 10x developer.";
  return `
${role}. 
Use the language that corresponds to this file extension: '${entry.ext ?? "ts"}.'
${entry.declaration ? "The function MUST implement the following interface:" + entry.declaration + ". Check twice that every type is declared or imported." : ""}.
The function MUST be exported.
The source code may never be empty.

`;
}

function createTestSystemPrompt(entry: PlanResponseSchema["plan"]["0"]) {
  const role = "You are a 10x test engineer.";
  return `
${role}. 
Use the language that corresponds to this file extension: '${entry.ext ?? "ts"}.'
${entry.declaration ? "Write meaningful tests for the following interface:'" + entry.declaration : "'"}.
The function MUST be imported.
The function can be found in the same folder as the test.
The file that contains the function is named like the function itself.
You MUST at least create one positive and one negative test case.

For Typescript use "jest". 
For python use "PyUnit"
`;
}

// TODO enable  other test runners. e.g. 'For Typescript use "bun:test'".

/**
 * TODO separate impl, test, execute test into separate commands or flags, to make it less error prone.
 */
async function executeSingleTask(
  entry: PlanResponseSchema["plan"]["0"],
  name: string,
) {
  console.log(entry);

 entry.preferences=entry.preferences??""

  const languageConfig = getLanguageConfigFromTask(entry);

  /**
   * create implementation files
   */

  // const implSystemPrompt = createImplementationSystemPrompt(entry);
  // const implRes = await askOpenApiStructured(
  //   "",
  //   implSystemPrompt + entry.task,
  //   FunctionResponseSchema,
  // );

  console.log("using langchain to generate source code");
  const implRes = await createLcSourceCodeImpl(entry, languageConfig);

  const functionName = camelCase(entry.id);

  const implFileLocation = name + "src/" + functionName + ".ts";
  console.log(implFileLocation);

  const implJson = JSON.stringify(implRes, null, "  ");

  await $`echo ${implJson} > ${file(implFileLocation)}.log.json`;
  await $`echo ${implRes.sourceCode} > ${file(implFileLocation)}`;

  /**
   * create test files
   */

  // TODO there will be many cases where we do not have a tyoppe declaration. we should probably enforce it, to make it easier to create impl and tests.
  // const testSystemPrompt = createTestSystemPrompt({
  //   ...entry,
  //   declaration: entry.declaration ?? "any", // ?? implRes.typeDeclaration,
  // });
  // const testRes = await askOpenApiStructured(
  //   "",
  //   testSystemPrompt +
  //     `The test should make sure that the following task can be executed successfully:'${entry.task}'`,
  //   FunctionResponseSchema,
  // );
  console.log("using langchain to generate test code");
  const testRes = await createLcTestCodeImpl(entry, languageConfig);

  const testFileLocation = name + "src/" + functionName + ".test.ts";
  console.log("TestFile:", testFileLocation);

  const testJson = JSON.stringify(testRes, null, "  ");

  await $`echo ${testJson} > ${file(testFileLocation)}.log.json`;
  await $`echo ${testRes.sourceCode} > ${file(testFileLocation)}`;

  //-------------------------
  // await  $`bun test ./${testFileLocation}`;
  // await $`bun jest ${testFileLocation}`;
  await runTestCommand(entry,languageConfig?.testCommand??"echo 'no test command defined'",implFileLocation,testFileLocation);
  //-------------------------
  const logLocation = name + "log.txt";
  const logJson = JSON.stringify({ functionName, index: entry.id }, null, "");
  await $`echo ${logJson} >> ${file(logLocation)}`;
}
