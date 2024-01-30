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

export type TemplateKey = `cookiecutter.${string}`;

export type FileDescriptor = {
  name: string;
  content: string;
};

export type FileDescriptorSubject = Rx.Subject<FileDescriptor>;
