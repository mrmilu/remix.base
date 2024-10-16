import type { BaseError } from "../models/base-error-proposal";

export interface ILogger {
  logInfo(message: string): void;
  logError(error: BaseError): void;
}
