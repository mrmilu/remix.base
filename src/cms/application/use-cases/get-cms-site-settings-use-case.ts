import type { ICMSRepository } from "@/src/cms/domain/interfaces/cms-repository";
import { GetRoutePathDataInputModel } from "@/src/cms/domain/models/get-route-path-data-model";
import { inject, injectable } from "inversify";
import type { CMSSerializableContentModel } from "@/src/cms/domain/models/cms-content-model";
import type { CacheHeadersBuilder } from "@/src/shared/domain/models/cache-headers-builder";
import { TYPES } from "@/ioc/__generated__/types";
import type { IocProvider } from "@/ioc/interfaces";
import { type Languages, getPathnameWithLanguage } from "@/src/shared/presentation/i18n";

export type SiteSettings = "social_media_settings" | "home_metatags_settings" | "entity_queues_settings";

@injectable()
export class GetCMSSiteSettingsUseCase {
  @inject(TYPES.ICMSRepository) private readonly cmsRepositoryProvider!: IocProvider<ICMSRepository>;

  async execute(
    language: Languages,
    cacheHeadersBuilder: CacheHeadersBuilder | null,
    key: SiteSettings = "home_metatags_settings"
  ): Promise<CMSSerializableContentModel> {
    const repository = await this.cmsRepositoryProvider();
    return await repository.getRouterPathData(
      new GetRoutePathDataInputModel({
        url: getPathnameWithLanguage(language, `/jsonapi/site-config/item/${key}`),
        entityBundle: key,
        language: language,
        cacheHeadersBuilder
      })
    );
  }
}
