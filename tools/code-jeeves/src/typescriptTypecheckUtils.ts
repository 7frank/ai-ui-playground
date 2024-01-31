import ts from "typescript";
import { uniq } from "lodash-es";

export function checkTypescriptSyntax(code: string) {
  const sourceFile = ts.createSourceFile(
    "temp.ts",
    code,
    ts.ScriptTarget.Latest,
    true,
  );

  function findSyntaxErrors(node: ts.Node) {
    if (node.kind === ts.SyntaxKind.Unknown || ts.isJSDocTypeExpression(node)) {
      const { line, character } = sourceFile.getLineAndCharacterOfPosition(
        node.getStart(),
      );
      const lineText = sourceFile.getFullText().split(/\r?\n/)[line];
      throw new Error(
        `Syntax error at line ${line + 1}, column ${character + 1}: "${lineText.trim()}"`,
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
    true,
  );

  const program = ts.createProgram({ rootNames: ["temp.ts"], options: {} });
  const checker = program.getTypeChecker();

  let unspecifiedTypes: string[] = [];

  function findUnspecifiedTypes(node: ts.Node) {
    // Check for function declarations and their parameters
    if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node) || ts.isFunctionExpression(node) || ts.isArrowFunction(node)) {
      // Check parameters
      node.parameters.forEach(parameter => {
        if (parameter.type && ts.isTypeReferenceNode(parameter.type)) {
          const type = checker.getTypeAtLocation(parameter);
          if (isTypeUnspecified(type)) {
            unspecifiedTypes.push(parameter.type.typeName.getText());
          }
        }
      });

      // Check return type
      if (node.type && ts.isTypeReferenceNode(node.type)) {
        const type = checker.getTypeAtLocation(node.type);
        if (isTypeUnspecified(type)) {
          unspecifiedTypes.push(node.type.typeName.getText());
        }
      }
    }

    ts.forEachChild(node, findUnspecifiedTypes);
  }

  function isTypeUnspecified(type: ts.Type): boolean {
    // If the type is any or unknown, or if it does not have a symbol (not defined), it's unspecified
    return (type.flags & ts.TypeFlags.Any || type.flags & ts.TypeFlags.Unknown) && !type.getSymbol();
  }

  findUnspecifiedTypes(sourceFile);

  return uniq(unspecifiedTypes);
}




/**
 * Is looking for a function like the following:
 * `const internalFunction = function() { };`
 * `export const exportedFunction = () => { }`;
 */
export function checkCodeForFunctionsAndExports(code: string) {
  const sourceFile = ts.createSourceFile(
    "temp.ts",
    code,
    ts.ScriptTarget.Latest,
    true,
  );

  let hasFunctionDeclaration = false;
  let hasExportedFunction = false;

  function findFunctionDeclarationsAndExports(node: ts.Node) {
    if (ts.isFunctionDeclaration(node)) {
      hasFunctionDeclaration = true;
      checkForExport(node);
    }

    if (ts.isVariableStatement(node)) {
      node.declarationList.declarations.forEach((declaration) => {
        if (isFunctionVariableDeclaration(declaration)) {
          hasFunctionDeclaration = true;
          checkForExport(node);
        }
      });
    }

    ts.forEachChild(node, findFunctionDeclarationsAndExports);
  }

  function isFunctionVariableDeclaration(node: ts.Node): boolean {
    return (
      ts.isVariableDeclaration(node) &&
      !!node.initializer &&
      (ts.isFunctionExpression(node.initializer) ||
        ts.isArrowFunction(node.initializer))
    );
  }

  function checkForExport(node: ts.FunctionDeclaration | ts.VariableStatement) {
    if (
      node.modifiers &&
      node.modifiers.some(
        (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
      )
    ) {
      hasExportedFunction = true;
    }
  }

  findFunctionDeclarationsAndExports(sourceFile);

  if (!hasFunctionDeclaration) {
    throw new Error(
      "The source code does not contain any function declarations.",
    );
  }

  if (!hasExportedFunction) {
    throw new Error("The source code does not contain any exported function.");
  }
}

export function extractFunctionName(functionSignature: string): string | null {
  const sourceFile = ts.createSourceFile(
    'temp.ts',
    functionSignature,
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS
  );

  function findFunctionName(node: ts.Node): string | null {
    // Handle function declarations
    if (ts.isFunctionDeclaration(node) && node.name) {
      return node.name.getText(sourceFile);
    }
    // Handle variable declarations where the initializer is a function
    else if (ts.isVariableDeclaration(node) && node.initializer && (ts.isFunctionExpression(node.initializer) || ts.isArrowFunction(node.initializer))) {
      if (node.name && ts.isIdentifier(node.name)) {
        return node.name.text;
      }
    }
    return ts.forEachChild(node, findFunctionName);
  }

  return findFunctionName(sourceFile);
}

