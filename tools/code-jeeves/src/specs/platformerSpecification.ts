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

  const constraints = `Specify the steps to create a program. Exclude steps that you cannot implement in source code
Each step should be implementable as a program function. 
Prefer the following packages when implementing: ${preferredPackages.join(",")}
Prefer the following frameworks: ${frameworks.join(",")}`;

  const problemStatement = `Generate a step by step plan for a program that can do the following:
- it can create tests.
- it can create functions for those tests with OpenAI. 
- it can execute functions and tests
- it can create AST functions that traverse code and, for example, extract certain functions. 
- it can take arguments, for example, to file paths that it uses to create a new function.

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
