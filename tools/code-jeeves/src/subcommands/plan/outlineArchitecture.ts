import { $, file } from "bun";
import {
  askOpenApiStructured2,
} from "../../askOpenAI";

import path from "node:path";
import fs from "node:fs";


import type { ArchitectCommandParams } from "./plan";

import { findNearestFileDirectory } from "../../findNearest";

import specFunction, { ArchitectSpecification, ArchitectureResponse } from "../../specs/betterSpec";
import { ZodType } from "zod";
import { userPrompt,confirmPrompt } from "../../questions";
import { availableModels } from "../../models";


export async function outlineArchitecture({
  name,
  spec,
  sm
}: ArchitectCommandParams) {
  name = path.normalize(name) + "/";

  const model=sm? await userPrompt("select a model",availableModels):undefined

  const ss = requireBySchema(spec, ArchitectSpecification);

  await runFileTask("init project",path.normalize(name + "requirements.json"),async ()=>{
  return  formatJson({problemStatement:ss.problemStatement})
  })

  await runFileTask("run architect",path.normalize(name + "architecture.json"),async ()=>{

    console.log("ProblemStatement:",ss.problemStatement)
    const question = ss.problemStatement.description + ss.problemStatement.tasks.map(it => "- "+it).join("\n");
    const res = await askOpenApiStructured2(question, {
      schema: ArchitectureResponse,
      systemMessage: ss.system + " Constraints:" + ss.constraints,model
    });
  
  return  formatJson(res.data)
  })

}

/**
 * Requires a typescript file from a string, ensuring the file is structured based on the schema
 */
function requireBySchema<T>(spec: string, schema: ZodType<T>) {
  const fileDirectory = findNearestFileDirectory(process.cwd(), "package.json");
  const s = path.resolve(fileDirectory ?? "", spec);
  if (!fs.existsSync(s)) {
    console.warn("spec file not found:", s);
    process.exit(1);
  }

  // TODO define schema and version
  const specFunction = require(s);
  const ss = schema.parse(
    specFunction.default()
  );
  return ss;
}

function formatJson(o:object)
{
 return  JSON.stringify(o, null, 2);

}


async function runFileTask(taskName:string,fileName:string,task:()=>Promise<string>,yes=false)
{
  const dirName=path.dirname(fileName)
  if (fs.existsSync(fileName)) {
  
    if (!await confirmPrompt(`Run Task:"${taskName}", for file "${fileName}"?`,false,yes)) {
      console.log(
        `Skipped Task:"${taskName}", Reason: File Exists (${fileName})`
      );
    return 
    }
  }
    console.log(
      `Running Task:"${taskName}", for File: (${fileName})`
    );

  const content= await  task()
  await $`mkdir -p ${dirName}`;


  await $`echo ${content} > ${file(fileName)}`;


}

