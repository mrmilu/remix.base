import { serverOnly$ } from "vite-env-only/macros";

import enTranslation from "@/src/shared/presentation/i18n/locales/es-ES";
import esTranslation from "@/src/shared/presentation/i18n/locales/en-GB";

// This is the list of languages your application supports, the last one is your
// fallback language
export const supportedLngs = ["es-ES", "en-GB"] as const;

// This is the language you want to use in case
// the user language is not in the supportedLngs
export const fallbackLng = "es-ES";

// The default namespace of i18next is "translation", but you can customize it
export const defaultNS = "translation";

const translationResources = {
  "es-ES": { translation: enTranslation },
  "en-GB": { translation: esTranslation }
} as const;

export type resources = typeof translationResources;

export type Languages = (typeof supportedLngs)[number];

export const resources = serverOnly$(translationResources);

export function getPathnameWithLanguage(language: Languages, pathname: string) {
  if (!pathname.startsWith("/")) {
    pathname = `/${pathname}`;
  }
  if (language === fallbackLng) return pathname;
  return `/${language}${pathname}`;
}
