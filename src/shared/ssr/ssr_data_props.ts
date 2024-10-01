import type { SsrSerializedData } from "./ssr_data";

export interface SsrDataPageProps {
  ssrSerializedData: SsrSerializedData;
  isNotFoundPage?: boolean;
  isErrorPage?: boolean;
}
