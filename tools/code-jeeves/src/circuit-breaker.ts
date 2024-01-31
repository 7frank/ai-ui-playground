
interface AdaptableCircuitBreaker<T, U> {
  initialParams: T;
  retryParamsCallback: (params: T, lastResponse: U, error: Error) => T;
  fn: (params: T, setLastResponse: (val: U) => void) => Promise<U>;
  maxRetries?: number;
  timeout?: number; // Timeout in milliseconds
}

export async function createAdaptableCircuitBreaker<T, U>({
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

