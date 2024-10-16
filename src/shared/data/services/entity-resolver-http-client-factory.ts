import type { IHttpClient } from "@schema-data-loader/core/resolver";
import { inject, injectable } from "inversify";
import type { IEntityResolverHttpClientFactory } from "@/src/shared/domain/interfaces/entity-resolver-http-client-factory";
import { RestClient } from "@/src/shared/data/services/rest-client";
import type { CacheHeadersBuilder } from "@/src/shared/domain/models/cache-headers-builder";
import type { IEnvVars } from "@/src/shared/domain/interfaces/env-vars";
import { getPathnameWithLanguage, type Languages } from "@/src/shared/presentation/i18n";
import { TYPES } from "@/ioc/__generated__/types";
import { generatorConf } from "inversify-generator/decorators";
import { safeJsonParse } from "../transformers/safe-json-parse";
import { safeJsonStringify } from "../transformers/safe-json-stringify";
import { err } from "neverthrow";
import { logError } from "./logger";

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace global {
  /** Cache to speed up hot reload while running the development server */
  let cacheMap: Map<string, string>;
}

class EntityResolverHttpClient implements IHttpClient {
  constructor(
    private readonly language: Languages,
    private readonly client: RestClient,
    private readonly cacheHeadersBuilder: CacheHeadersBuilder | null,
    private readonly useCache: boolean
  ) {}

  async get<D = unknown>(url: string, params?: Record<string, unknown>): Promise<D> {
    if (url.startsWith("/")) {
      url = url.substring(1);
    }
    const route = getPathnameWithLanguage(this.language, `/jsonapi/${url}`);

    if (this.useCache && !Object.keys(params ?? {}).length) {
      return await this.getCached(route);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const responseResult = await this.client.get<any>(route, { params });

    if (responseResult.isErr()) {
      logError(responseResult.error);

      throw responseResult.error;
    }

    const response = responseResult.value;

    this.cacheHeadersBuilder?.addHeaders(response);
    return response.data.data;
  }

  private getCached = async (route: string) => {
    global.cacheMap = global.cacheMap || new Map<string, string>();

    if (global.cacheMap.has(route)) {
      return safeJsonParse(global.cacheMap.get(route) ?? "")._unsafeUnwrap();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await this.client.get<any>(route);

    if (response.isErr()) {
      return err(response.error);
    }

    const stringifiedDataResult = safeJsonStringify(response.value.data.data);

    if (stringifiedDataResult.isErr()) {
      return err(stringifiedDataResult.error);
    }

    global.cacheMap.set(route, stringifiedDataResult.value);

    return response.value.data.data;
  };
}

@injectable()
@generatorConf({ binding: "default" })
export class EntityResolverHttpClientFactory implements IEntityResolverHttpClientFactory {
  private readonly client: RestClient;

  constructor(@inject(TYPES.IEnvVars) private readonly envVars: IEnvVars) {
    this.client = new RestClient(envVars.cmsApiUrl);
  }

  create(language: Languages, cacheHeadersBuilder: CacheHeadersBuilder | null): IHttpClient {
    return new EntityResolverHttpClient(language, this.client, cacheHeadersBuilder, this.envVars.useEntityResolverCache);
  }
}
