import { z } from "zod";

export const subtaskSchema = z.object({
  description: z.string(),
});
export const taskSchema = z.object({
  description: z.string(),
  subtask: z.array(subtaskSchema).optional(),
});
export const taskFileSchema = z.array(taskSchema);
