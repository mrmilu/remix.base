import type { PropsWithChildren } from "react";
import { createContext, useContext, useRef } from "react";
import type { SsrData, SsrSerializedData } from "@/src/shared/ssr/ssr_data";
import type { SsrDataBuilder } from "@/src/shared/ssr/ssr_data_builder";
import { safeClone } from "@/src/shared/data/utils/safe-clone";
import type { Result } from "neverthrow";
import { err, ok } from "neverthrow";
import { BaseError, ErrorCode } from "@/src/shared/domain/models/base-error-proposal";
import { logError } from "@/src/shared/data/services/logger";
const SsrDataContext = createContext<SsrData | null>(null);

interface Props extends PropsWithChildren {
  builder: SsrDataBuilder;
  ssrSerializedData: SsrSerializedData;
}

export function SsrDataProvider({ builder, ssrSerializedData, children }: Props) {
  const isDeserialized = useRef(false);
  const builderRef = useRef(builder);

  if (!isDeserialized.current) {
    isDeserialized.current = true;
    // Must copy data because the source data gets modified when it is serialized.
    // This is due to a strange behaviour in the class-transformers library.
    const copiedData = safeClone(ssrSerializedData);

    if (copiedData.isErr()) {
      logError(copiedData.error);
    } else {
      builderRef.current.deserializeData(copiedData.value);
    }
  }

  return <SsrDataContext.Provider value={builderRef.current.ssrData}>{children}</SsrDataContext.Provider>;
}

export function useSsrData<TData>(key: string): Result<TData, Error> {
  const ssrData = useContext(SsrDataContext);
  if (!ssrData) {
    return err(
      new BaseError({
        message: "SSR data not found",
        code: ErrorCode.NOT_FOUND_ERROR,
        details: [
          {
            type: "ErrorInfo",
            domain: "domain",
            metadata: {
              key: key
            }
          }
        ],
        origin: "useSsrData",
        recoverable: true,
        avoidable: true
      })
    );
  }

  if (!(key in ssrData)) {
    return err(
      new BaseError({
        message: "SSR data for key not found",
        code: ErrorCode.NOT_FOUND_ERROR,
        details: [
          {
            type: "ErrorInfo",
            domain: "domain",
            metadata: {
              key: key
            }
          }
        ],
        origin: "useSsrData",
        recoverable: true,
        avoidable: true
      })
    );
  }

  return ok(ssrData[key] as TData);
}

export function useSsrDataOrNull<TData>(key: string): TData | null {
  return useSsrData<TData>(key).unwrapOr(null);
}
