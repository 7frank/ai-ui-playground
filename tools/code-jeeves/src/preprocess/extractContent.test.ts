// extractContent.test.ts
import { extractContent } from "./extractContent"; // Adjust the import path based on your project structure

describe("extractContent function", () => {
  it("should extract detailed content correctly", () => {
    const input = '```typescript\nconst foo = "bar";\n "test" \n```';
    const expected = {
      type: "detailed",
      prefix: "",
      language: "typescript",
      sourceCode: 'const foo = "bar";\n "test"',
      postfix: "",
    };
    const result = extractContent(input);
    expect(result).toEqual(expected);
  });

  it("should extract detailed content correctly", () => {
    const input =
      'Prefix text ```typescript\nconst foo = "bar";\n "test" \n``` Postfix text';
    const expected = {
      type: "detailed",
      prefix: "Prefix text",
      language: "typescript",
      sourceCode: 'const foo = "bar";\n "test"',
      postfix: "Postfix text",
    };
    const result = extractContent(input);
    expect(result).toEqual(expected);
  });

  it("should extract more  detailed content correctly", () => {
    const input = `Text1
Text2 
\`\`\`typescript
const foo = "bar";
    "test"
\`\`\` 
Postfix1
Postfix2`;
    const expected = {
      type: "detailed",
      prefix: "Text1\nText2",
      language: "typescript",
      sourceCode: 'const foo = "bar";\n    "test"',
      postfix: "Postfix1\nPostfix2",
    };
    const result = extractContent(input);
    expect(result).toEqual(expected);
  });

  it("should only extract the first code block if there is and move the second in the postfix", () => {
    const input = `Text1
Text2 
\`\`\`typescript
const foo = "bar";
    "test"
\`\`\` 

\`\`\`sp
ls
\`\`\` 

Postfix1
Postfix2`;
    const expected = {
      type: "detailed",
      prefix: "Text1\nText2",
      language: "typescript",
      sourceCode: 'const foo = "bar";\n    "test"',
      postfix: "```sp\nls\n``` \n\nPostfix1\nPostfix2",
    };
    const result = extractContent(input);
    expect(result).toEqual(expected);
  });

  it("should handle raw content correctly", () => {
    const input = "This is a simple string without the specific format.";
    const expected = { type: "raw", rawString: input };
    const result = extractContent(input);
    expect(result).toEqual(expected);
  });

  it("should trim whitespace around extracted parts correctly and work with newlines", () => {
    const input =
      '  \n Prefix text  ```typescript\nconst foo = "bar";\n```  Postfix text \n ';
    const expected = {
      type: "detailed",
      prefix: "Prefix text",
      language: "typescript",
      sourceCode: 'const foo = "bar";',
      postfix: "Postfix text",
    };
    const result = extractContent(input);
    expect(result).toEqual(expected);
  });

  it("should return raw type for input with incorrect code block delimiters", () => {
    const input =
      'Prefix text ``typescript\nconst foo = "bar";\n`` Postfix text';
    const expected = { type: "raw", rawString: input };
    const result = extractContent(input);
    expect(result).toEqual(expected);
  });

  // Add more tests here as needed
});
