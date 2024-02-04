require("dotenv").config();
import OpenAI from "openai";
import chalk from "chalk";

import { OpenAIChatApi } from "llm-api";
import { RequestOptions, completion } from "zod-gpt";
import * as z from "zod";
import { getModelsConfig } from "./models";

if (!process.env["OPENAI_API_KEY"]) throw new Error("missing OPENAI_API_KEY");

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

export async function askOpenAI(systemPrompt: string, userQuestion: string) {
  console.log(
    systemPrompt
      .split("\n")
      .map((it) => chalk.green("system:") + it)
      .join("\n"),
  );
  console.log(
    userQuestion
      .split("\n")
      .map((it) => chalk.green("user:") + it)
      .join("\n")
      .substring(0, 50) + "...",
  );
  const mConfig = getModelsConfig();
  const response = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userQuestion },
    ],
    model: mConfig.sourcecode.model,
    max_tokens: 1000,
    //temperature:0.8
  });

  const reason = response.choices[0].finish_reason;
  const asIntended = reason == "stop";

  if (!asIntended)
    throw new Error("LLM did not finish properly. Reason:" + reason);

  const tokenUsed = response.usage?.total_tokens;
  console.log(chalk.green("info:"), `${tokenUsed} Token used`);

  return response.choices[0].message.content;
}
const mConfig = getModelsConfig();
const openai2 = new OpenAIChatApi(
  { apiKey: process.env["OPENAI_API_KEY"] },
  { model: mConfig.sourcecode.model },
  // { model: 'gpt-4-0613' },
  // { model: 'gpt-4-0125-preview' },
);

export async function askOpenApiStructured<T extends z.ZodType>(
  /**
   * @deprecated
   */
  systemPrompt: string,
  userQuestion: string,
  schema: T,
) {
  const response = await completion(openai2, userQuestion, { schema });

  // TODO find out how does this api handles cut of messages?
  // const reason = response....
  // const asIntended = reason == "stop";

  // if (!asIntended)
  //   throw new Error("LLM did not finish properly. Reason:" + reason);

  const tokenUsed = response.usage?.totalTokens;
  console.log(chalk.green("info:"), `${tokenUsed} Token used`);

  return response.data;
}

export async function askOpenApiStructured2<T extends z.ZodType>(
  userQuestion: string,
  opt: Partial<RequestOptions<T>>,
) {
  const response = await completion(openai2, userQuestion, opt);

  const tokenUsed = response.usage?.totalTokens;
  console.log(chalk.green("info:"), `${tokenUsed} Token used`);
  return response;
}
