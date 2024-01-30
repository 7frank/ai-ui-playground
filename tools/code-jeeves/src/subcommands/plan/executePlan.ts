import { $, file } from "bun";
import { askOpenApiStructured } from "../../askOpenAI";
import { camelCase } from "lodash-es";
import {
  functionResponseSchema,
  planResponseSchema,
} from "../../../taskFileSchema";
import path from "node:path";
import type { ExecuteCommandParams } from "./plan";

export async function executePlan({ name }: ExecuteCommandParams) {
  name = path.normalize(name) + "/";

  const tasksDefinitionFilePath = name + "plan.json";
  console.log(tasksDefinitionFilePath);

  const planJson = await $`cat ${tasksDefinitionFilePath}`.json();

  const parsed = planResponseSchema.parse(planJson);

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
    const res = await askOpenApiStructured("", task, functionResponseSchema);
    const functionName = camelCase(reason);

    const targetFileLocation = name + "src/" + functionName + ".ts";
    console.log(targetFileLocation);

    const json = JSON.stringify(res, null, "  ");

    await $`echo ${json} > ${file(targetFileLocation)}.json`;
    await $`echo ${res.sourceCode} > ${file(targetFileLocation)}`;
  }
}
