import { z } from "zod";

/**
 *
 * @returns This spec tries to use software design pattern to better structure the generated tasks
 * - Strategic Design: Identify domains before splitting tasks.
 * - Tactical Design: Use  Factories, Services, Adapters, Event driven Communication
 * - Acyclic Graph instead of Tree Structure for more flexibility
 */

export const ArchitectSpecification = z.object({
  problemStatement: z.string(),
  constraints: z.string(),
  system: z.string(),
});

export type ArchitectSpecification = z.infer<typeof ArchitectSpecification>;

export const UserStory = z
  .object({
    who: z.string(),
    what: z.string(),
    why: z.string(),
    cause:z.union([
      z.literal('specified').describe("this user story is a direct result of the specification given by the user"),
      z.literal('optional').describe("this user story is a result of the system infering potential additional requirements"),
      z.literal('critical').describe("this user story is a result of the system identifying critical requirements"),
      z.string().describe("if it  does not fit into the other categories"),
    ]).describe("describes the reason why a user story was added")
  })
  .describe("A user story describing a task or bunsiness process");

const BoundedContext = z.object({
  contextName: z.string().describe("The bounded context the tasks belongs to"),
  description: z.string().describe("a brief description of the bounded context"),
  userStories: UserStory.array(),
  relations: z.string().array().describe("A list of other bounded contexts in the domain, this bounded context relates to"),
});

const Domain = z.object({
  domainName: z.string().describe("The domain the tasks belongs to"),
  description: z.string().describe("a brief description of the domain"),
  boundedContexts:BoundedContext.array(),
});

export const ArchitectureResponse = z.object({ domains: Domain.array() });

export type ArchitectureResponse = z.infer<typeof ArchitectSpecification>;

// Defining tasks directly
const tasksExample1 = [
  "developing a scalable microservices architecture",
  "implementing a secure device registration process",
  "creating a real-time dashboard for monitoring",
  "designing a workflow engine for device rules",
  "integrating with third-party services",
];

// Constructing the user question
const userQuestionExample1 = `The project is to develop a cloud-based service for managing IoT devices, including device registration, status monitoring, and sending commands to devices. The tasks include ${tasksExample1.join(", ")}. How should these tasks be categorized and are there any additional tasks you suggest?`;

// Additional Example 1
const tasksExample2 = [
  "setting up a blockchain for transactions",
  "creating a digital wallet integration",
  "designing the user interface for the marketplace",
  "ensuring secure storage for digital art",
];

// Constructing the user question
const userQuestionExample2 = `The goal is to create an online marketplace for digital art. The tasks include ${tasksExample2.join(", ")}. What additional features might be needed?`;

// Additional Example 2
const tasksExample3 = [
  "developing interactive lessons",
  "implementing a spaced repetition system for review",
  "integrating speech recognition for practice",
  "designing a progress tracking system",
];

// Constructing the user question
const userQuestionExample3 = `We're building a mobile app for language learning. The tasks include ${tasksExample3.join(", ")}. Are there any other critical tasks for enhancing user engagement?`;

// Additional Example 3
const tasksExample4 = [
  "developing a centralized control system",
  "designing a user-friendly mobile app",
  "integrating with various smart devices",
  "ensuring data security and privacy",
];

// Constructing the user question
const userQuestionExample4 = `The project involves creating a smart home automation system. The tasks include ${tasksExample4.join(", ")}. What additional tasks are necessary for a seamless user experience?`;




// Additional Example 3
const tasksExample5 = [
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
const userQuestionExample5 = `We're building a multiplayer online game. The tasks include ${tasksExample5.join(", ")}. Are there any other critical tasks for enhancing user engagement?`;


export default function jeevesSpecification(): ArchitectSpecification {
  const system = `You are a senior software architect knowledgeable in DDD strategic design,
tactical design, ports & adapters, event-driven communication, and other patterns. 
You do know what a domain/bounded context is:
They are not: "UI","Frontend","Backend"

Domains in sense of Domain Driven Design are for example:
- E-commerce
- Banking
- Health Care
- Insurance
- Logistics
- Real Estate
- Education
- Manufacturing
- Transportation
- Entertainment

"Bounded Contexts" in sense of Domain Driven Design are for example:
- Order Management
- Inventory Management
- Customer Service
- Payment Processing
- Shipping and Delivery
- Product Catalog
- User Authentication
- Pricing and Discounts
- Reporting and Analytics
- Customer Relationship Management (CRM)

- Analyze the given tasks
- Identify domains and "bounded contexts"
- Identify any relevant missing tasks
- Categorize the tasks by Domains  & "Bounded Contexts",
suggest a breakdown for complex tasks, `;

  const constraints = `You are highly practical, if the System is not complex, then don't try to make it complex, but instead provide a simple solution `;

  const problemStatement = userQuestionExample5;

  return {
    problemStatement,
    constraints,
    system,
  };
}
