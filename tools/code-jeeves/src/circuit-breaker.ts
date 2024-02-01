interface AdaptableCircuitBreaker<Params, ResponseType> {
  initialParams: Params;
  retryParamsCallback: (params: Params, lastResponse: ResponseType, error: Error) => Params;
  fn: (params: Params, setLastResponse: (val: ResponseType) => void) => Promise<ResponseType>;
  maxRetries?: number;
  timeout?: number; // Timeout in milliseconds
}

export async function createAdaptableCircuitBreaker<Params, ResponseType>({
  initialParams,
  retryParamsCallback,
  fn,
  maxRetries = 5,
  timeout = 60000,
}: AdaptableCircuitBreaker<Params, ResponseType>): Promise<ResponseType> {
  let currentParams = initialParams;
  let startTime = Date.now();

  for (let i = 0; i < maxRetries; i++) {
    if (Date.now() - startTime > timeout) {
      throw new Error("Operation timed out");
    }

    let lastSyntacticallyCorrectResponse: ResponseType = undefined as ResponseType;
    try {
      console.log(`${i}th try with params`, currentParams);
      const response = await fn(currentParams, (val) => {
        lastSyntacticallyCorrectResponse = val;
      });
      return response ;
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
