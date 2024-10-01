import { captureException } from "@sentry/remix";
import { isNotFoundAxiosError } from "./axios";

export function logError(error: unknown) {
  console.error(error);
  if (process.env.NEXT_PUBLIC_SENTRY_ENABLED && !isNotFoundAxiosError(error)) {
    captureException(error);
  }
}
