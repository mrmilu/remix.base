import type { IEntityResolverService } from "@schema-data-loader/core/resolver";
import type { CacheHeadersBuilder } from "@/src/shared/domain/models/cache-headers-builder";
import type { Languages } from "@/src/shared/presentation/i18n";

export interface IEntityResolverFactory {
  create(language: Languages, cacheHeadersBuilder: CacheHeadersBuilder | null): IEntityResolverService;
}
