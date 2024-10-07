import type { IEntityResolverHttpClientFactory } from "@/src/shared/domain/interfaces/entity-resolver-http-client-factory";

import type { IEntityResolverService } from "@schema-data-loader/core/resolver";
import { EntityResolverService } from "@schema-data-loader/core/resolver";
import { inject, injectable } from "inversify";
import { TYPES } from "@/ioc/__generated__/types";
import type { Languages } from "@/src/shared/presentation/i18n";
import type { CacheHeadersBuilder } from "@/src/shared/domain/models/cache-headers-builder";
import type { IEntityResolverFactory } from "@/src/shared/domain/interfaces/entity-resolver";
import { generatorConf } from "inversify-generator/decorators";

@injectable()
@generatorConf({ binding: "default" })
export class EntityResolverFactory implements IEntityResolverFactory {
  @inject(TYPES.IEntityResolverHttpClientFactory) private entityResolverHttpClientFactory!: IEntityResolverHttpClientFactory;

  create(language: Languages, cacheHeadersBuilder: CacheHeadersBuilder | null): IEntityResolverService {
    return new EntityResolverService(this.entityResolverHttpClientFactory.create(language, cacheHeadersBuilder));
  }
}
