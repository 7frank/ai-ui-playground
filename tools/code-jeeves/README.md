# code-jeeves

This CLI is a prototype for declarative programming using openai or other LLMs.

- you specify the what you want
- jeeves generates the relevant code and tests for you.

It does roughly the following:

- user: "create a sum function for multiple numbers `function cumSum(n:...number):number`"
- code-jeeves: generates tests > generates implementation > runs tests > commits

- you can make changes whenever you want and rerun steps how often you like

## installation

To install dependencies:

```bash

npm install -g bun

sudo apt-get install pv

bun install

# create alias (to be able to use autocomplete)
alias jee="bun index.ts"

```

## example

```bash
 # clean  folder
 rm -rf .out/emailClient

 # alter the spec for the email client (or create a new spec)
 code ./src/specs/emailClientSpec.ts

 # generate a plan from the spec
 bun index.ts plan generate -n .out/emailClient -s ./src/specs/emailClientSpec.ts

 # run the code generator for each item in the plan
 bun index.ts plan execute -n .out/emailClient/ --force

 # if the command exists with an error you can resume like this
 bun index.ts plan execute -n .out/emailClient/ -r

# run test manually and see how bad things are with your generated code :-)
 bun test  ./.out/emailClient/**/*.test.ts
```

WIP init the new CLI with tab completion support
```
alias jee="bun cli.ts" 
jee completion > /tmp/c.sh 
source /tmp/c.sh
```
## development

To run certain cli tasks:

```bash
# show the help menu
bun run index.ts

# select a file for which you want to generate doc blocks
bun index.ts refactor documentation -p=*.ts

# select a file for which you want to generate doc blocks, instead of committing it will only attempt a dry run
bun index.ts refactor documentation -p=*.ts --dryRun

# run the whole plan from start to finish
bun index.ts plan generate -n .out/test1

# reference a spec file that contains infomration what the program is about
bun index.ts plan generate -n .out/emailClient -s ./src/specs/emailClientSpec.ts

# run single item (3) of plan
bun index.ts plan execute -n .out/test1 -i 3

## continue plan by looking at log and resuming with next in list
bun index.ts plan execute -n .out/test1 -r

# most likely you want to debug the prompts
DEBUG=zod-gpt:* bun index.ts plan execute -n .out/example -i 2

# or even more debugging information
DEBUG=* bun index.ts plan execute -n .out/example -i 2

### experiments ###

# WIP specific prompts to generate implementation & tests & test runner feedback
bun ./src/prompt.ts

# WIP langchain prompts to generate implementation & tests & test runner feedback
bun ./src/lc/lc.ts

```

> You will have to monitor your usage manually as there are no official endpoints for that as of now:
> go to https://platform.openai.com/usage and login

---

We patched cmd-ts manually using patch-package, to be able to implement autocomplete. As of now there is no official support 
for a patching mechanism from bun but we can do this semi  automatic. see https://github.com/oven-sh/bun/issues/2336#issuecomment-1712458657 

In essence
```sh
#run
bun ./bun.lockb > ./yarn.lock 

# edit packages in node_modules

# create patch  (here for cmd-ts)
bun patch-package cmd-ts

# remove yarn file again
rm ./yarn.lock

```

# todo

whole work flow explained:
https://chat.openai.com/share/36d638c1-388b-4665-afb8-0de5cc359331

- check out what Automatic Prompt Engineering can do, which either replaces our code or extends the functionality
- check out what langchain can do

  - https://github.com/haseeb-heaven/langchain-coder
  - [LangChain](https://github.com/alphasecio/langchain-examples)
  - https://langchain-coder.streamlit.app/

- implement TDD flow
  - generate plan
  - run plan incrementally
  - from type declaration generate test
  - from task generate implementation
  - let developer extend test or fix implementation of bot cannot fix the task themself
- subdivide task if it is too big / complex.
  - ask the bot, if they think that it should be subdiveded or run for n iterations
  - then create subtasks,update the plan and run each individually
  - this could loop a long as it needs to
- change the structure of tasks so that they represent a dependency tree
  - traverse through the tree from the leaves and create the functions
  - if all leaves of a parent node succeed then create the function for this node, with the dependencies of the leaves
  - if not all leaves succeed then gio to the "next parents leaves"
  - log the state of the succeeded pending and failed "nodes", with relevant information for debugging later on
  - Why?
    - this allows to traverse the tree without human interaction
    - if certain nodes need manual attention, debug and fix them manually
      - e.g. run code ./test1.ts && code ./impl1.ts and then mark as fixed by only running the test again
      - or changing the plan.json so that the code generator can handle it on their own
- restructure system prompts
- add debug information to the auto commit messages for comparing for example models and results
- test functionality 2x "py" tasks & 1x "iynb" task that uses those functions
- try out autoSlice feature of zod-gpt
- check for max token quota in the future when endpoints are available
- tab completion with yargs (oclif seems too much overhead)
## potential scenarios we could test

- `create an email cli that allows me to log into read and anwer my emails`
- `create an api that has the following endpoints, user,login,logout,todolist,create todo`
- `create a game, (e.g. platformer, rpg, giana sisters clone, flappy bird) focus on e.g. game logic, tile graphics`

## potential other use cases
- batch writing tests in repos
- batch documentation
- similar to other github copilot alternatives integration in vscode



## troubleshooting

### sometimes generating fails without details of the json in question

> .out/test2/plan.json
> resuming tasks with: 1
> updating useInquirerToPromptUsersForInput
> Use inquirer to prompt users for input

> 4 | value: true
> 5 | });
> 6 | exports.JSONRepairError = void 0;
> 7 | class JSONRepairError extends Error {
> 8 | constructor(message, position) {
> 9 | super(message + ' at position ' + position);
> ^
> error: Invalid number 'e', expecting a digit but got 'x' at position 153
> at new JSONRepairError (/home/freimann/Projects/baby/ai-ui-playground/tools/code-jeeves/node_modules/jsonrepair/lib/cjs/utils/JSONRepairError.js:9:5)
> at expectDigit (/home/freimann/Projects/baby/ai-ui-playground/tools/code-jeeves/node_modules/jsonrepair/lib/cjs/regular/jsonrepair.js:543:13)
> at expectDigitOrRepair (/home/freimann/Projects/baby/ai-ui-playground/tools/code-jeeves/node_modules/jsonrepair/lib/cjs/regular/jsonrepair.js:554:7)
> at parseNumber (/home/freimann/Projects/baby/ai-ui-playground/tools/code-jeeves/node_modules/jsonrepair/lib/cjs/regular/jsonrepair.js:461:11)
> at parseValue (/home/freimann/Projects/baby/ai-ui-playground/tools/code-jeeves/node_modules/jsonrepair/lib/cjs/regular/jsonrepair.js:83:73)
> at parseObject (/home/freimann/Projects/baby/ai-ui-playground/tools/code-jeeves/node_modules/jsonrepair/lib/cjs/regular/jsonrepair.js:199:32)
> at parseValue (/home/freimann/Projects/baby/ai-ui-playground/tools/code-jeeves/node_modules/jsonrepair/lib/cjs/regular/jsonrepair.js:83:23)
> at jsonrepair (/home/freimann/Projects/baby/ai-ui-playground/tools/code-jeeves/node_modules/jsonrepair/lib/cjs/regular/jsonrepair.js:50:21)
> at parseUnsafeJson (/home/freimann/Projects/baby/ai-ui-playground/tools/code-jeeves/node_modules/llm-api/dist/src/utils.js:27:38)
> at /home/freimann/Projects/baby/ai-ui-playground/tools/code-jeeves/node_modules/llm-api/dist/src/models/openai.js:197:32

### how to prevent erratic behaviour of LLM after some missleading prompts

We gave it source code, test code and the test runner result of a method using the star wars api:
It "fixed" the code:

> function isNumber(value) {
> return /^d+$/.test(value);
> }
>
> console.log(isNumber("123")); // true
> console.log(isNumber("abc")); // false
> console.log(isNumber("123x")); // false
> console.log(isNumber("e123")); // false

### traversing seems a bit bugged

sortFromLeaves does not return main4 and promptAction9 **but**
traversing plan in order:

> 0: fetchEmails1
> 1: selectEmail2
> 2: writeEmail3
> 3: fetchEmails5
> 4: selectEmail6
> 5: writeEmail7
> 6: displayEmail8
> 7: fetchEmails10
> 8: selectEmail11
> 9: writeEmail12
> 10: displayEmail13
> 11: promptAction14

order of functions executed **and** main4 and promptAction9 are executed multiple times:

> {"functionName":"fetchEmails1","index":"fetchEmails1"}
> {"functionName":"selectEmail2","index":"selectEmail2"}
> {"functionName":"writeEmail3","index":"writeEmail3"}
> {"functionName":"fetchEmails5","index":"fetchEmails5"}
> {"functionName":"selectEmail6","index":"selectEmail6"}
> {"functionName":"writeEmail7","index":"writeEmail7"}
> {"functionName":"displayEmail8","index":"displayEmail8"}
> {"functionName":"fetchEmails10","index":"fetchEmails10"}
> {"functionName":"selectEmail11","index":"selectEmail11"}
> {"functionName":"writeEmail12","index":"writeEmail12"}
> {"functionName":"displayEmail13","index":"displayEmail13"}
> {"functionName":"promptAction14","index":"promptAction14"}
> {"functionName":"main4","index":"main4"}
> {"functionName":"main4","index":"main4"}
> {"functionName":"main4","index":"main4"}
> {"functionName":"main4","index":"main4"}
> {"functionName":"promptAction9","index":"promptAction9"}
> {"functionName":"promptAction9","index":"promptAction9"}
> {"functionName":"promptAction9","index":"promptAction9"}
> {"functionName":"promptAction9","index":"promptAction9"}
