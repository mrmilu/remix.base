import { injectable } from "inversify";
import { generatorConf } from "inversify-generator/decorators";
import type { IEnvVars } from "../interfaces/env-vars";

@injectable()
@generatorConf({ binding: "default" })
export class EnvVars implements IEnvVars {
  serverUrl: string = import.meta.env.VITE_APP_API_URL || "";

  cmsApiUrl: string = import.meta.env.VITE_APP_CMS_API_URL || "";

  get isProduction() {
    return import.meta.env.MODE === "production";
  }

  sentryDSN?: string = import.meta.env.SENTRY_DSN || import.meta.env.VITE_APP_SENTRY_DSN;

  sentryEnabled: boolean = import.meta.env.VITE_APP_SENTRY_ENABLED === "true";

  useEntityResolverCache: boolean = import.meta.env.ENTITY_RESOLVER_CACHE === "true";
}
