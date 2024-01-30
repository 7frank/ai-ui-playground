import * as ts from 'typescript';
import * as zod from 'zod';

export 
const zodRefineTypescript = (code: string) => {
    const fileName = 'file.ts';
    const sourceFile = ts.createSourceFile(fileName, code, ts.ScriptTarget.Latest);

    const compilerHost = ts.createCompilerHost({});
    compilerHost.getSourceFile = (fileName: string) => {
        return fileName === 'file.ts' ? sourceFile : undefined;
    };
    const program = ts.createProgram([fileName], {}, compilerHost);

    let diagnostics = ts.getPreEmitDiagnostics(program);
    if (diagnostics.length > 0) {
        const formattedErrorMessage = formatDiagnosticsWithLineNumbers(diagnostics, code);
        console.log(formattedErrorMessage)
        throw new Error(formattedErrorMessage);
    }

    return true;
};

export 
const TypeScriptCodeValidator = zod.string().refine(zodRefineTypescript, {
  message: "The string contains invalid TypeScript code",
});

function formatDiagnosticsWithLineNumbers(diagnostics: readonly ts.Diagnostic[], code: string): string {
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
