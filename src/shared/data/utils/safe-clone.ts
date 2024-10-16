import type { Result } from "neverthrow";
import type { ParseError } from "../../domain/models/parse-error";
import type { TypeError } from "../../domain/models/type-error";
import { safeJsonParse } from "../transformers/safe-json-parse";
import { safeJsonStringify } from "../transformers/safe-json-stringify";
import type { JSONType } from "../../domain/types/json";

export function safeClone(data: JSONType): Result<JSONType, ParseError | TypeError> {
  return safeJsonStringify(data).andThen(safeJsonParse);
}
