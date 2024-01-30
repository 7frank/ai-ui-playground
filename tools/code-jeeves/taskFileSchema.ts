import { z } from "zod";

/**
 * Section specifies the form the response of generating a `plan` via openai has to have.
 */

export const taskSchema = z.object({
  reason: z.string().describe("Name the reasoning for this step"),
  id: z.string().describe("Unique step id"),
  task: z.string().describe("What is the task to be done for this step?"),
});

export const plan = z.array(taskSchema);

export const planResponseSchema = z.object({
  plan,
});

/**
 * Section specifies the form the response of generating a `function` via openai has to have.
 */

const language = z
  .string()
  .describe("What is the programming lanuage the code is written in?");
const packages = z.array(
  z.string().describe("What packages does this code use/import. e.g. numpy, lodash"),
);
const typeDeclaration = z
  .string()
  .describe("What does the type declaration of the of function look like?");
const sourceCode = z
  .string()
  .describe("Generate the full source code without abbreviating");

export const functionResponseSchema = z.object({
  language,
  packages,
  typeDeclaration,
  sourceCode,
});
