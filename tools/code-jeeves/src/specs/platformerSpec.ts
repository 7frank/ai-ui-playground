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

// Additional Example 3
const tasksExample = [
  "develop 2d platformer (similar to giana sisters)",
  "designing a user-friendly ui",
  "implement game logic backend using nodejs",
  "implement frontend using https://phaser.io/",
  "implement server clinet communication via websockets",
  "implement appealing game GUI",
  "enable authentication integrating social login providers like google, github",
  "allow to buy custom skins for the player models integrating stripe payments"
];

// Constructing the user question
const userQuestionExample = `We're building a multiplayer online game.  Are there any other critical tasks for enhancing user engagement?`;

  const problemStatement = `Generate a step by step plan for a program that can do the following:
${tasksExample.map(it => "- "+it).join("\n")}

${userQuestionExample}


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
