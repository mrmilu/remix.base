import * as Sentry from "@sentry/remix";
import { RemixBrowser, useLocation, useMatches } from "@remix-run/react";
import { startTransition, StrictMode, useEffect } from "react";
import { hydrateRoot } from "react-dom/client";

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

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>
  );
});
