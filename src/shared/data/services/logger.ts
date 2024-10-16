import { injectable } from "inversify";
import { generatorConf } from "inversify-generator/decorators";
import type { ILogger } from "@/src/shared/domain/interfaces/logger";
import type { BaseError } from "@/src/shared/domain/models/base-error-proposal";
import { captureException, captureMessage } from "@sentry/remix";

@injectable()
@generatorConf({ binding: "default" })
export class Logger implements ILogger {
  get isProduction() {
    return process.env.NODE_ENV === "production";
  }

  logInfo(message: string): void {
    if (this.isProduction) {
      captureMessage(message);
    } else {
      console.log(message);
    }
  }

  logError(error: BaseError): void {
    if (this.isProduction) {
      captureException(error);
    } else {
      console.error(error);
    }
  }
}
