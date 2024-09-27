import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import Fetch from "i18next-fetch-backend";

import * as Sentry from "@sentry/remix";
import { RemixBrowser, useLocation, useMatches } from "@remix-run/react";
import { startTransition, StrictMode, useEffect } from "react";
import { hydrateRoot } from "react-dom/client";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { getInitialNamespaces } from "remix-i18next/client";
import { defaultNS, fallbackLng, supportedLngs } from "@/src/shared/presentation/i18n";

import { locator } from "@/src/shared/ioc/__generated__";
import { TYPES } from "@/src/shared/ioc/__generated__/types";
import type { IEnvVars } from "@/src/shared/domain/interfaces/env-vars";

if (locator.get<IEnvVars>(TYPES.IEnvVars).sentryEnabled) {
  Sentry.init({
    dsn: locator.get<IEnvVars>(TYPES.IEnvVars).sentryDSN || "https://examplePublicKey@o0.ingest.sentry.io/0",
    tracesSampleRate: 1,
    integrations: [
      Sentry.browserTracingIntegration({
        useEffect,
        useLocation,
        useMatches
      })
    ]
  });
}

async function main() {
  await i18next
    .use(initReactI18next)
    .use(Fetch)
    .use(I18nextBrowserLanguageDetector)
    .init({
      defaultNS,
      fallbackLng,
      supportedLngs,
      ns: getInitialNamespaces(),
      detection: {
        // Here only enable htmlTag detection, we'll detect the language only
        // server-side with remix-i18next, by using the `<html lang>` attribute
        // we can communicate to the client the language detected server-side
        order: ["htmlTag"],
        // Because we only use htmlTag, there's no reason to cache the language
        // on the browser, so we disable it
        caches: []
      },
      backend: {
        // We will configure the backend to fetch the translations from the
        // resource route /api/locales and pass the lng and ns as search params
        loadPath: "/api/locales?lng={{lng}}&ns={{ns}}"
      }
    });

  startTransition(() => {
    hydrateRoot(
      document,
      <I18nextProvider i18n={i18next}>
        <StrictMode>
          <RemixBrowser />
        </StrictMode>
      </I18nextProvider>
    );
  });
}

main().catch((error) => console.error(error));
