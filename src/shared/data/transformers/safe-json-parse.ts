import type { Result } from "neverthrow";
import { ok, err } from "neverthrow";
import type { JSONType } from "@/src/shared/domain/types/json";
import { ParseError } from "../../domain/models/parse-error";

export function safeJsonParse(jsonString: string): Result<JSONType, ParseError> {
  try {
    return ok(JSON.parse(jsonString));
  } catch (error: unknown) {
    return err(
      new ParseError({
        message: error instanceof Error ? error.message : `An error ocurred parsing string ${jsonString}`,
        origin: "safeJsonParse",
        stack: error instanceof Error ? error.stack : undefined,
        cause: error instanceof Error ? error.cause : undefined,
        details: [
          {
            type: "ErrorInfo",
            domain: "example.com",
            metadata: {
              parsedString: jsonString
            }
          }
        ]
      })
    );
  }
}
