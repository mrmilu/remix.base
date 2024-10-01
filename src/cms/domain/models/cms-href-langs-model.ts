import type { Languages } from "@/src/shared/presentation/i18n";

export type CmsHrefLangsModel = Record<Languages, string | null>;

export const createEmptyCmsHrefLangsModel = (): CmsHrefLangsModel => ({
  "en-GB": null,
  "es-ES": null
});
