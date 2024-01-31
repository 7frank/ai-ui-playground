import { z } from "zod";
import { zodRefineTypescript } from "../subcommands/plan/zodRefineTypescript";

/**
 * Section specifies the form the response of generating a `plan` via openai has to have.
 */

export const TaskSchema = z.object({
  id: z.string().describe("Unique function name in camelCase notation"),
  task: z.string().describe("What is the task to be done for this step?"),
  ext: z
    .string()
    .optional()
    .describe(
      "The file extension from which to infer the source code language.",
    ),
  declaration: z.string().optional().describe("the function declaration"),
});

export type TaskSchema = z.infer<typeof TaskSchema>;

export const plan = z.array(TaskSchema);

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

const sourceCode = z
  .string()
  .describe("Generate the full source code without abbreviating");

export const FunctionResponseSchema = z.object({
  language,
  packages,
  // typeDeclaration,
  sourceCode,
});
// TODO this probably requires a tsconfig
// .superRefine((data, ctx) => {
//   if (data.language === 'typescript') {
//     try {
//       zodRefineTypescript(data.sourceCode);
//     } catch (error) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: (error as Error).message,
//         path: ['sourceCode'], // Specify the path to the field with the issue
//       });
//     }
//   }
// });
