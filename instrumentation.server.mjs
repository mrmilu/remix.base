import * as Sentry from "@sentry/remix";

if (process.env.SENTRY_ENABLED) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1,
    autoInstrumentRemix: true
  });
}
