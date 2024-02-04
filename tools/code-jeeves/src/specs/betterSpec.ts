import { z } from "zod";



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


/**
 *
 * @returns This spec tries to use software design pattern to better structure the generated tasks
 * - Strategic Design: Identify domains before splitting tasks.
 * - Tactical Design: Use  Factories, Services, Adapters, Event driven Communication
 * - Acyclic Graph instead of Tree Structure for more flexibility
 */

export const ArchitectSpecification = z.object({
  problemStatement: z.object({description:z.string(),tasks:z.string().array()}),
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

  export const Epic = z
  .object({
    summary: z.string(),
    description: z.string(),
    userStories:UserStory.array()
  })
  .describe("An Epic is describing a task or bunsiness process on a high level. It must contain a full description of what to do in this context. This will later be used to create user stories");



const BoundedContext = z.object({
  contextName: z.string().describe("The bounded context the tasks belongs to"),
  description: z.string().describe("a brief description of the bounded context"),
  epics: Epic.array(),
  relations: z.string().array().describe("A list of other bounded contexts in the domain, this bounded context relates to"),
});

const Domain = z.object({
  domainName: z.string().describe("The domain the tasks belongs to"),
  description: z.string().describe("a brief description of the domain"),
  boundedContexts:BoundedContext.array(),
});

export const ArchitectureResponse = z.object({ domains: Domain.array() });

export type ArchitectureResponse = z.infer<typeof ArchitectSpecification>;

const epic=`
Epics are essentially broad, high-level descriptions of the desired outcomes or goals. They are too large to be completed in a single iteration or sprint and therefore need to be divided into more manageable pieces. Epics are used to organize work around a specific theme or feature set over multiple sprints.

Characteristics of an epic include:

    Broad in scope: Epics are wide-ranging and cover a significant piece of functionality or a major feature.
    Longer duration: They take more time to complete, often spanning several sprints or even across release cycles.
    Higher level: Epics provide a high-level understanding of the goal or objective without delving into the specifics of implementation.
    Breakdown: They are broken down into smaller user stories to facilitate planning, execution, and tracking.
`

const userStory=`
User Story

A user story, on the other hand, is a short, simple description of a feature from the perspective of the user or customer. User stories are much more specific and focused than epics. They describe a specific requirement or piece of functionality that can be completed within a single sprint. User stories are a way to articulate how a piece of work will deliver a particular value back to the customer.

Characteristics of a user story include:

    Specific and concise: User stories are detailed enough to allow for estimation and planning but open to interpretation to encourage collaboration and innovation.
    Short duration: They are small enough to be completed within a single sprint by a team.
    Follows a simple template: A common format for user stories is: "As a [type of user], I want [some goal] so that [some reason]."
    Includes acceptance criteria: User stories typically include acceptance criteria that define the scope of the story and what is needed for the work to be accepted as complete.
`

export default function jeevesSpecification(): ArchitectSpecification {
  const system = `You are a senior software architect knowledgeable in DDD strategic design,
tactical design, ports & adapters, event-driven communication, and other patterns. 
You do know what a domain/bounded context is:
They are not: "UI","Frontend","Backend"

Definition: "Domains" in sense of Domain Driven Design are for example:
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

Definition: "Bounded Contexts" in sense of Domain Driven Design are for example:
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

Definition: ${epic}

Definition: ${userStory}

Your will receive problöem statements and tasks that you will help to create "Epics" from

 `;

  const constraints = `You are highly practical, if the System is not inherently complex, then don't try to make it complex, but keep it simple.`;



  return {
    problemStatement:{description:userQuestionExample,tasks:tasksExample},
    constraints,
    system,
  };
}
