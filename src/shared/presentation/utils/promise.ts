import { logError } from "./log-error";

export async function handlePromiseError<T>(promise: Promise<T>): Promise<T | null> {
  try {
    return await promise;
  } catch (e) {
    logError(e);
    return null;
  }
}
