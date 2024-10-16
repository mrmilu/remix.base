import type { ConstructorType } from "../types/constructor-type";

export enum ErrorCode {
  PARSE_ERROR = 0,
  TYPE_ERROR = 1,
  NOT_FOUND_ERROR = 2,
  NETWORK_ERROR = 3
}

export type Details = {
  type: string;
  domain: string;
  metadata: Record<string, unknown>;
};

export class BaseError extends Error {
  timestamp?: string;
  code: ErrorCode;
  details: Array<Details>;
  recoverable: boolean;
  avoidable: boolean;
  origin: string;

  constructor(params: Omit<ConstructorType<BaseError>, "name">) {
    super(params.message);
    this.timestamp = params.timestamp || new Date().toISOString();
    this.code = params.code;
    this.details = params.details;
    this.recoverable = params.recoverable;
    this.avoidable = params.avoidable;
    this.origin = params.origin;
  }
}
