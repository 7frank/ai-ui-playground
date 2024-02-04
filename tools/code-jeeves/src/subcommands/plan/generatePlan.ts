import { $, file } from "bun";
import { askOpenApiStructured, askOpenApiStructured2 } from "../../askOpenAI";

import path from "node:path";


import { PlanResponseSchema } from "../../types/taskFileSchema";

import type { GenerateCommandParams } from "./plan";
import { JeevesSpecificationSchema } from "../../types/specSchema";

import { formatJson, requireBySchema, runFileTask } from "./requireBySchema";
import { availableModels } from "../../models";
import { userPrompt } from "../../questions";

export async function generatePlan({ name, spec,sm }: GenerateCommandParams) {
  name = path.normalize(name) + "/";

  const model=sm? await userPrompt("select a model",availableModels):undefined


  const ss = requireBySchema(spec, JeevesSpecificationSchema);

  await runFileTask("generate plan",path.normalize(name + "plan.json"),async ()=>{
    
 
   const question = ss.problemStatement
    const res = await askOpenApiStructured2(question, {
      schema: PlanResponseSchema,
     
      model
    });

    return  formatJson(res.data)
    })
}
