import * as ts from 'typescript';
import * as zod from 'zod';

const TypeScriptCodeValidator = zod.string().refine((code) => {
  // Create a virtual TypeScript file
  const fileName = 'file.ts';
  const sourceFile = ts.createSourceFile(fileName, code, ts.ScriptTarget.Latest);

  // Create a program using the source file
  const compilerHost = ts.createCompilerHost({});
  compilerHost.getSourceFile = (fileName: string) => {
    return fileName === 'file.ts' ? sourceFile : undefined;
  };
  const program = ts.createProgram([fileName], {}, compilerHost);

  // Get and format diagnostics
  let diagnostics = ts.getPreEmitDiagnostics(program);
  if (diagnostics.length > 0) {
    throw new Error(formatDiagnosticsWithLineNumbers(diagnostics, code));
  }

  return true;
}, {
  message: "The string contains invalid TypeScript code",
});

function formatDiagnosticsWithLineNumbers(readonlydiagnostics: readonly ts.Diagnostic[], code: string): string {
  let message = 'TypeScript Compilation Errors:\n';
  for (const diagnostic of diagnostics) {
    if (diagnostic.file) {
      let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
      let errorMessage = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
      message += `Error at ${line + 1}:${character + 1}: ${errorMessage}\n`;
      message += `> ${code.split('\n')[line]}\n`;
    } else {
      message += `${ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}\n`;
    }
  }
  return message;
}

// Example usage
try {
  TypeScriptCodeValidator.parse('let a: number = "123";');  // Invalid TypeScript code
  console.log('Valid TypeScript code');
} catch (error) {
  console.error(error.message);
}
