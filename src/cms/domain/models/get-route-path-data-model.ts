import type { ConstructorType } from "@/src/shared/domain/types/constructor-type";
import type { CacheHeadersBuilder } from "@/src/shared/domain/models/cache-headers-builder";
import type { Languages } from "@/src/shared/presentation/i18n";

export class GetRoutePathDataInputModel {
  url: string;
  entityBundle: string;
  language: Languages;
  cacheHeadersBuilder: CacheHeadersBuilder | null;

  constructor(params: ConstructorType<GetRoutePathDataInputModel>) {
    this.url = params.url;
    this.entityBundle = params.entityBundle;
    this.language = params.language;
    this.cacheHeadersBuilder = params.cacheHeadersBuilder;
  }
}
