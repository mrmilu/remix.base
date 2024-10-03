import type { PropsWithChildren } from "react";
import { createContext, useContext, useRef } from "react";
import type { SsrData, SsrSerializedData } from "@/src/shared/ssr/ssr_data";
import type { SsrDataBuilder } from "@/src/shared/ssr/ssr_data_builder";

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
    const copiedData = JSON.parse(JSON.stringify(ssrSerializedData));

    builderRef.current.deserializeData(copiedData);
  }

  console.log("sfdkld", builderRef.current.ssrData);
  return <SsrDataContext.Provider value={builderRef.current.ssrData}>{children}</SsrDataContext.Provider>;
}

export function useSsrData<TData>(key: string): TData {
  const ssrData = useContext(SsrDataContext);
  if (!ssrData) {
    throw new Error("SSR data not found");
  }
  if (!(key in ssrData)) {
    throw new Error(`SSR data for key "${key}" not found`);
  }
  return ssrData[key] as TData;
}

export function useSsrDataOrNull<TData>(key: string): TData | null {
  const ssrData = useContext(SsrDataContext);
  if (!ssrData) {
    throw new Error("SSR data not found");
  }
  if (!(key in ssrData)) {
    return null;
  }
  return ssrData[key] as TData;
}
