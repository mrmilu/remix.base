import type { CacheHeadersBuilder } from "@/src/shared/domain/models/cache-headers-builder";
import type { IHttpClient } from "@schema-data-loader/core/resolver";
import type { Languages } from "@/src/shared/presentation/i18n";

export interface IEntityResolverHttpClientFactory {
  create(language: Languages, cacheHeadersBuilder: CacheHeadersBuilder | null): IHttpClient;
}
