import "i18next";
import type { resources, defaultNS } from "@/src/shared/presentation/i18n";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: resources["en"];
  }
}
