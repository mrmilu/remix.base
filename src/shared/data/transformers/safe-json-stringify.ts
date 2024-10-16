import type { Result } from "neverthrow";
import { ok, err } from "neverthrow";
import { TypeError } from "@/src/shared/domain/models/type-error";

export function safeJsonStringify(...args: Parameters<typeof JSON.stringify>): Result<string, TypeError> {
  try {
    return ok(JSON.stringify(...args));
  } catch (error: unknown) {
    return err(
      new TypeError({
        message: error instanceof Error ? error.message : `An error ocurred while converting object to string`,
        origin: "safeJsonStringify",
        stack: error instanceof Error ? error.stack : undefined,
        cause: error instanceof Error ? error.cause : undefined,
        details: [
          {
            type: "ErrorInfo",
            domain: "example.com",
            metadata: {
              ...args
            }
          }
        ]
      })
    );
  }
}
