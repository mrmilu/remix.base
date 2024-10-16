import { logError } from "../../data/services/logger";
import { BaseError, ErrorCode } from "../../domain/models/base-error-proposal";

export async function handlePromiseError<T>(promise: Promise<T>): Promise<T | null> {
  try {
    return await promise;
  } catch (e) {
    if (e instanceof Error) {
      logError(
        new BaseError({
          code: ErrorCode.NETWORK_ERROR,
          details: [],
          message: e.message,
          origin: "handlePromiseError",
          cause: e.cause,
          stack: e.stack,
          avoidable: true,
          recoverable: true
        })
      );
    }

    return null;
  }
}
