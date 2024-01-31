import ts from "typescript";
import {uniq} from "lodash-es"

interface AdaptableCircuitBreaker<T, U> {
  initialParams: T;
  retryParamsCallback: (params: T, lastResponse: U, error: Error) => T;
  fn: (params: T, setLastResponse: (val: U) => void) => Promise<U>;
  maxRetries?: number;
  timeout?: number; // Timeout in milliseconds
}

export async function callOpenAIWithRetry<T, U>({
  initialParams,
  retryParamsCallback,
  fn,
  maxRetries = 5,
  timeout = 60000,
}: AdaptableCircuitBreaker<T, U>): Promise<U> {
  let currentParams = initialParams;
  let startTime = Date.now();

  for (let i = 0; i < maxRetries; i++) {
    if (Date.now() - startTime > timeout) {
      throw new Error("Operation timed out");
    }

    let lastSyntacticallyCorrectResponse: U = undefined as U;
    try {
      console.log(`${i}th try with params`, currentParams);
      const response = await fn(currentParams, (val) => {
        lastSyntacticallyCorrectResponse = val;
      });
      return response;
    } catch (error) {
      console.error("Error during callback execution: ", error);
      currentParams = retryParamsCallback(
        currentParams,
        lastSyntacticallyCorrectResponse,
        error as Error,
      );
    }
  }
  throw new Error("Max retries reached with no valid response");
}

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