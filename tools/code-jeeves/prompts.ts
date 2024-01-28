const role = "You are a 10x developer.";
const onlyCode = "Return only the updated code and no explanations.";
const documentCodePrompt =
  "Document the following source code and functions. Make sure that every function has a proper comment block."; //

const today = new Date().toLocaleString().split(",")[0];
const commentOutDeadCode = `If some code is not used or exported then comment out this code. Prefix the comment with: '// Deprecated since: ${today}'`;
const optimizeCode =
  "Optimize the following source code and functions. Comment code that is not used out.";
const prompts = [documentCodePrompt, commentOutDeadCode, optimizeCode];

export const systemPrompt = `${role} ${prompts.join("\n")}  ${onlyCode}`;
