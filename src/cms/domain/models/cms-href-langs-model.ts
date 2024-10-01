import type { Languages } from "@/src/shared/presentation/i18n";

export type CmsHrefLangsModel = Record<Languages, string | null>;

export const createEmptyCmsHrefLangsModel = (): CmsHrefLangsModel => ({
  en: null,
  es: null
});
