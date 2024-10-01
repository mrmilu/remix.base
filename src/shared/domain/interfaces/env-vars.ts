export interface IEnvVars {
  serverUrl: string;
  cmsApiUrl: string;
  // Sentry
  sentryDSN?: string;
  sentryEnabled: boolean;
  useEntityResolverCache: boolean;
}
