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

export const PlanResponseSchema = z.object({
  plan,
});

export type PlanResponseSchema = z.infer<typeof PlanResponseSchema>;

/**
 * Section specifies the form the response of generating a `function` via openai has to have.
 */

const language = z
  .string()
  .describe("What is the programming lanuage the code is written in?");
const packages = z.array(
  z
    .string()
    .describe("What packages does this code use/import. e.g. numpy, lodash"),
);
const typeDeclaration = z
  .string()
  .min(
    1,
    "You must specify a type declaration, which mirrors your function implementation. If you do not have a function implementation use the value \"string'",
  )
  .describe(
    "What does the type declaration of the of function look like? This is a required parameter",
  );
const sourceCode = z
  .string()
  .describe("Generate the full source code without abbreviating");

export const functionResponseSchema = z.object({
  language,
  packages,
  typeDeclaration,
  sourceCode,
});
