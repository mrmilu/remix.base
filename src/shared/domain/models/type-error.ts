import type { ConstructorType } from "@/src/shared/domain/types/constructor-type";
import { BaseError, ErrorCode } from "./base-error-proposal";

export class TypeError<D extends object = never> extends BaseError {
  data?: D;

  constructor(params: Omit<ConstructorType<TypeError>, "name" | "code" | "avoidable" | "recoverable">) {
    super({
      code: ErrorCode.TYPE_ERROR,
      avoidable: true,
      recoverable: false,
      message: params.message,
      details: params.details,
      origin: params.origin,
      cause: params.cause,
      stack: params.stack
    });
  }
}
