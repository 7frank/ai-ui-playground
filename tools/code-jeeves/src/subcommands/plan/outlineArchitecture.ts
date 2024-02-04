import {
  askOpenApiStructured2,
} from "../../askOpenAI";

import path from "node:path";


import type { ArchitectCommandParams } from "./plan";


import specFunction, { ArchitectSpecification, ArchitectureResponse } from "../../specs/betterSpec";
import { userPrompt } from "../../questions";
import { availableModels } from "../../models";
import { requireBySchema, runFileTask, formatJson } from "./requireBySchema";


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
      systemMessage: ss.system + " Constraints:" + ss.constraints,
      model
    });
  
  return  formatJson(res.data)
  })

}


