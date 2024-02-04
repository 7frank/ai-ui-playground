import { $, file } from "bun";
import path from "node:path";
import fs from "node:fs";
import { findNearestFileDirectory } from "../../findNearest";
import { ZodType } from "zod";
import { confirmPrompt } from "../../questions";

/**
 * Requires a typescript file from a string, ensuring the file is structured based on the schema
 */
export function requireBySchema<T>(spec: string, schema: ZodType<T>) {
  const fileDirectory = findNearestFileDirectory(process.cwd(), "package.json");
  const s = path.resolve(fileDirectory ?? "", spec);
  if (!fs.existsSync(s)) {
    console.warn("spec file not found:", s);
    process.exit(1);
  }

  // TODO define schema and version
  const specFunction = require(s);
  const ss = schema.parse(
    specFunction.default()
  );
  return ss;
}
export function formatJson(o: object) {
  return JSON.stringify(o, null, 2);

}
export async function runFileTask(taskName: string, fileName: string, task: () => Promise<string>, yes = false) {
  const dirName = path.dirname(fileName);
  if (fs.existsSync(fileName)) {

    if (!await confirmPrompt(`Run Task:"${taskName}", for file "${fileName}"?`, false, yes)) {
      console.log(
        `Skipped Task:"${taskName}", Reason: File Exists (${fileName})`
      );
      return;
    }
  }
  console.log(
    `Running Task:"${taskName}", for File: (${fileName})`
  );

  const content = await task();
  await $`mkdir -p ${dirName}`;


  await $`echo ${content} > ${file(fileName)}`;


}
