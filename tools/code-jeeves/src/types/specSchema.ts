import { z } from "zod";

export const JeevesSpecificationSchema = z.object({
  problemStatement: z.string(),
  constraints: z.string(),
  frameworks: z.array(z.string()),
  preferredPackages: z.array(z.string()),
  language: z.string(),
  role: z.string(),
  methods: z.array(z.string()), // Assuming methods is an array of strings
});

export type JeevesSpecificationSchema = z.infer<
  typeof JeevesSpecificationSchema
>;
