import { z } from "zod";

import Rx from "rxjs";
import type { ParsingResult } from "cmd-ts/dist/cjs/argparser";

export const replaceSchema = z.object({
  src: z.string().min(1),
  trg: z.string().min(1),
  default: z.string().optional(),
});

const defineSchema = replaceSchema.omit({ src: true });

export const configSchema = z.object({
  /**
   * paths of files that we want to include in the copy and replace process
   */
  include: z.array(z.string()),
  /**
   * path pattern that will be excluded e.g. "**\/*.js"
   */
  exclude: z.array(z.string()).optional(),
  /**
   * define variables that are used by others
   */
  define: z.array(defineSchema).optional(),
  replaceInPath: z.array(replaceSchema).optional(),
  replaceInFile: z.array(replaceSchema).optional(),
});

export type Replace = z.infer<typeof replaceSchema>;
export type Define = z.infer<typeof defineSchema>;

export type Config = z.infer<typeof configSchema>;

const configurationMapSchema = z.record(z.string(), configSchema);

export const cookieGeneratorSchema = z.object({
  /**
   * a path to the root of a project or root of a github repo
   */
  source: z.string(),
  /**
   * a path to the target where the output (the template) will be generated
   */
  target: z.string(),

  /**
   * a string containing a handlebar  e.g. {{cookiecutter.repository_name}} which is required by cookiecutter to generate code from a template
   */
  repository: z.string(),

  configuration: configurationMapSchema,
});

export type CookieGenerator = z.infer<typeof cookieGeneratorSchema>;

export type TemplateKey = `cookiecutter.${string}`;

export type FileDescriptor = {
  name: string;
  content: string;
};

export type FileDescriptorSubject = Rx.Subject<FileDescriptor>;
