import ts from "typescript";
import { uniq } from "lodash-es";


export function checkTypescriptSyntax(code: string) {
  const sourceFile = ts.createSourceFile(
    "temp.ts",
    code,
    ts.ScriptTarget.Latest,
    true
  );

  function findSyntaxErrors(node: ts.Node) {
    if (node.kind === ts.SyntaxKind.Unknown || ts.isJSDocTypeExpression(node)) {
      const { line, character } = sourceFile.getLineAndCharacterOfPosition(
        node.getStart()
      );
      const lineText = sourceFile.getFullText().split(/\r?\n/)[line];
      throw new Error(
        `Syntax error at line ${line + 1}, column ${character + 1}: "${lineText.trim()}"`
      );
    }

    ts.forEachChild(node, findSyntaxErrors);
  }

  findSyntaxErrors(sourceFile);
}

export function checkForUnspecifiedTypes(code: string) {
  const sourceFile = ts.createSourceFile(
    "temp.ts",
    code,
    ts.ScriptTarget.Latest,
    true
  );

  const program = ts.createProgram({ rootNames: ["temp.ts"], options: {} });
  const checker = program.getTypeChecker();

  let unspecifiedTypes: string[] = [];

  function findUnspecifiedTypes(node: ts.Node) {
    if (ts.isTypeReferenceNode(node)) {
      const type = checker.getTypeAtLocation(node);
      if (type.flags & ts.TypeFlags.Any) {
        unspecifiedTypes.push(node.typeName.getText());
      }
    }
    ts.forEachChild(node, findUnspecifiedTypes);
  }

  findUnspecifiedTypes(sourceFile);

  return uniq(unspecifiedTypes);
}


export
  function checkCodeForFunctionsAndExports(code: string) {
  const sourceFile = ts.createSourceFile(
    'temp.ts',
    code,
    ts.ScriptTarget.Latest,
    true
  );

  let hasFunctionDeclaration = false;
  let hasExportedFunction = false;

  function findFunctionDeclarationsAndExports(node: ts.Node) {
    if (ts.isFunctionDeclaration(node)) {
      hasFunctionDeclaration = true;

      if (node.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword)) {
        hasExportedFunction = true;
      }
    }

    ts.forEachChild(node, findFunctionDeclarationsAndExports);
  }

  findFunctionDeclarationsAndExports(sourceFile);

  if (!hasFunctionDeclaration) {
    throw new Error('The source code does not contain any function declarations.');
  }

  if (!hasExportedFunction) {
    throw new Error('The source code does not contain any exported function.');
  }
}
