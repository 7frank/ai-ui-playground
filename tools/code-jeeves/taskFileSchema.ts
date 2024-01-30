import { z } from "zod";

export const taskSchema = z.object({
  reason: z.string().describe("Name the reasoning for this step"),
  id: z.string().describe("Unique step id"),
  task: z.string().describe("What is the task to be done for this step?"),
});

export const planSchema = z.array(taskSchema);

export const planResponseSchema = z.object({
  plan: planSchema,
});
