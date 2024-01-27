require("dotenv").config();
import OpenAI from "openai";

if (!process.env["OPENAI_API_KEY"]) throw new Error("missing OPENAI_API_KEY");

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

export async function askOpenAI(systemPrompt: string, userQuestion: string) {
  console.log("System:", systemPrompt);
   console.log("User:",userQuestion.substring(0,50)+"...")

  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: "assistant", content: systemPrompt },
        { role: "user", content: userQuestion },
      ],
      model: "gpt-3.5-turbo",
      max_tokens: 50,
    });
    console.log(response);
  const reason=response.choices[0].finish_reason
    const asIntended=reason!="stop"

  if (!asIntended) throw new Error("LLM did not finish properly. Reason:"+reason)

    const tokenUsed = response.usage?.total_tokens;
    console.log(`Bot: ${tokenUsed} Token used`);

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error in querying OpenAI: ", error);
    return null;
  }
}
