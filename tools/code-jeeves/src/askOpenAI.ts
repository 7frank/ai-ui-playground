require("dotenv").config();
import OpenAI from "openai";
import chalk from "chalk";

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

  const response = await openai.chat.completions.create({
    messages: [
      { role: "assistant", content: systemPrompt },
      { role: "user", content: userQuestion },
    ],
    model: "gpt-3.5-turbo",
    //max_tokens: 1000,
  });

  const reason = response.choices[0].finish_reason;
  const asIntended = reason == "stop";

  if (!asIntended)
    throw new Error("LLM did not finish properly. Reason:" + reason);

  const tokenUsed = response.usage?.total_tokens;
  console.log(chalk.green("info:"), `${tokenUsed} Token used`);

  return response.choices[0].message.content;
}
