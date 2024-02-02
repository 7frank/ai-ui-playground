type ContentResult = 
  | { type: "raw", rawString: string }
  | { type: "detailed", prefix: string, language: string, sourceCode: string, postfix: string };


  /**
   * extracts code blocks often returned by chatgpt instead of raw content
   */
export 
function extractContent(input: string): ContentResult {
  const pattern = /^([\s\S]*?)```([^\n]+)\n([\s\S]*?)```([\s\S]*?)$/;

  const match = input.match(pattern);

  if (match) {
    return {
      type: "detailed",
      prefix: match[1].trim(),
      language: match[2].trim(),
      sourceCode: match[3].trim(),
      postfix: match[4].trim(),
    };
  } else {
    // Return the raw string if the pattern does not match
    return { type: "raw", rawString: input };
  }
}


export function getFirstCodeBlock(s:string)
{

  const res=  extractContent(s)

  if (res.type=="raw") return res.rawString
  

  return res.sourceCode



}
