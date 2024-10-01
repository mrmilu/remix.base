import { serverOnly$ } from "vite-env-only/macros";

import enTranslation from "@/src/shared/presentation/i18n/locales/en";
import esTranslation from "@/src/shared/presentation/i18n/locales/es";

// This is the list of languages your application supports, the last one is your
// fallback language
export const supportedLngs = ["es", "en"] as const;

// This is the language you want to use in case
// the user language is not in the supportedLngs
export const fallbackLng = "es";

// The default namespace of i18next is "translation", but you can customize it
export const defaultNS = "translation";

const translationResources = {
  en: { translation: enTranslation },
  es: { translation: esTranslation }
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
