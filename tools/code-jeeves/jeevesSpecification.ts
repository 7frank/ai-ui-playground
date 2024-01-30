/**
 * TODO extract this into a json fille that can be used as input of "cli generate plan"
 */
export function jeevesSpecification() {
  // const role = "You are a 10x developer.";
  // const onlyCode = "Return only the markdown code and no explanations.";
  // const oaiPrompt = ` You have an existing function to connect to openai, ("async function askOpenAI(systemPrompt:string ,question:string):Promise<string>") that returns a string containing the source code for the question asked. `;
  // const prompts = [
  //   "",
  //   //oaiPrompt
  // ];
  // const systemPrompt = `
  //     ${role} ${prompts.join("\n")}  ${onlyCode}`;
  const preferredPackages = [
    "cmd-ts",
    "bun",
    "inquirer",
    "zod",
    "lodash-es",
    "dayjs",
    "jest",
  ].join(",");
  const preferredTools = ["bun shell"].join(",");

  const constraints = `          Specify the steps to create a program. 
Each step should be implementable as a program function. 
Prefer the following packages when implementing: ${preferredPackages}
Prefer the following tools: ${preferredTools}`;

  const problemStatement = `Generate a step by step plan for a program that can do the following:
- it can create tests.
- it can create functions for those tests with OpenAI. 
- it can execute functions and tests
- it can create AST functions that traverse code and, for example, extract certain functions. 
- it can take arguments, for example, to file paths that it uses to create a new function.

${constraints}
`;

  return { problemStatement };
}
