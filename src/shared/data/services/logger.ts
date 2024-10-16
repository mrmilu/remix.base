import { captureException, captureMessage } from "@sentry/remix";
import type { BaseError } from "../../domain/models/base-error-proposal";

const isProduction = process.env.NODE_ENV === "production";

export function logInfo(message: string) {
  if (isProduction && process.env.NEXT_PUBLIC_SENTRY_ENABLED) {
    captureMessage(message);
  } else {
    console.log(message);
  }
}

export function logError(error: BaseError) {
  if (isProduction && process.env.NEXT_PUBLIC_SENTRY_ENABLED) {
    captureException(error);
  } else {
    console.error(error);
  }
}
