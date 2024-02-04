import { z } from "zod";

const functionName = z
  .string()
  .describe(
    "function name in camelCase notation. The same function name like in the function declaration"
  );
const task = z.string().describe("What is the task to be done for this step?");

const ext = z
  .string()
  .optional()
  .describe(
    "The file extension from which to infer the source code language."
  );
const declaration = z.string().describe("the function declaration");
const preferences = z
  .string()
  .optional()
  .describe(
    "do you have suggestions or constraints? e.g. use a specific library?"
  );
/**
 * Section specifies the form the response of generating a `plan` via openai has to have.
 * 
 * Note: we defined 3 levels of tasks > subtasks > subsubtasks 
 *  So that serialization to json is not an issue.
 *  Which it was previously with recursive definition.
 */

const baseTaskSchema = z.object({
  functionName,
  task,
  ext,
  declaration,
  preferences,
});


 type SubTaskSchema = z.infer<typeof baseTaskSchema> & {
  subTasks?: SubTaskSchema[];
};

 const SubTaskSchema: z.ZodType<SubTaskSchema> = baseTaskSchema.extend({
  subTasks: baseTaskSchema.array()
    .optional()
    .describe("A list of subtasks of the parent task."),
});

export type TaskSchema = z.infer<typeof SubTaskSchema> & {
  subTasks?: TaskSchema[];
};

export const TaskSchema: z.ZodType<TaskSchema> = baseTaskSchema.extend({
  subTasks: SubTaskSchema.array()
    .optional()
    .describe("A list of subtasks of the parent task."),
});

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

export type FunctionResponseSchema = z.infer<typeof FunctionResponseSchema>;
