import type { JeevesSpecificationSchema } from "../types/specSchema";

export default function jeevesSpecification(): JeevesSpecificationSchema {
  const role =
    "You are a 10x developer. You generate code when given a certain task.";
  // TODO You have the following functions that you can import from "./src/generated-index.ts":
  const methods = [
    `async function askOpenAI(systemPrompt:string ,question:string):Promise<string>")`,
  ];

  const language = "typescript";

  const preferredPackages = [
    "cmd-ts",
    "bun",
    "inquirer",
    "zod",
    "lodash-es",
    "dayjs",
    "jest",
  ];
  const frameworks = ["bun shell"];

  const constraints = `Specify the steps to create a program. 
Each step should be implementable as a program function. 
Prefer the following packages when implementing: ${preferredPackages.join(",")}
Prefer the following frameworks: ${frameworks.join(",")}`;

  const problemStatement = `Generate a step by step plan for a program that can do the following:
 - it is an email client running on the command line
 - it can fetch your emails from the server 
 - you can select which one email you want to open
 - you can write emails
${constraints}
`;

  return {
    problemStatement,
    constraints,
    frameworks,
    preferredPackages,
    language,
    role,
    methods,
  };
}
