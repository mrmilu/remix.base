import { fallbackLng, type Languages } from "@/src/shared/presentation/i18n";
import type { GetBaseLayoutMenusUseCase } from "@/src/cms/application/use-cases/get-base-layout-menus-use-case";
import { createEmptyMenus, type Menus } from "@/src/cms/domain/models/menus";
import { CMSSerializableContentModel } from "@/src/cms/domain/models/cms-content-model";
import type { LogAndSaveError, SsrDataFactory } from "@/src/shared/ssr/ssr_data_factory";
import type { CacheHeadersBuilder } from "@/src/shared/domain/models/cache-headers-builder";
import { locator } from "@/ioc/__generated__";
import type { IocProvider } from "@/ioc/interfaces";
import { TYPES } from "@/ioc/__generated__/types";

export class CmsMenusSSRFactory implements SsrDataFactory<Menus> {
  static getKey = () => "cmsMenus";

  key = CmsMenusSSRFactory.getKey();

  constructor(
    private readonly language: Languages = fallbackLng,
    private readonly cacheHeadersBuilder: CacheHeadersBuilder | null = null
  ) {}

  async create(logAndSaveError: LogAndSaveError) {
    try {
      const useCase = await locator.get<IocProvider<GetBaseLayoutMenusUseCase>>(TYPES.GetBaseLayoutMenusUseCase)();
      return await useCase.execute(this.language, this.cacheHeadersBuilder);
    } catch (e) {
      logAndSaveError(this.key, e);
      return createEmptyMenus();
    }
  }
  serialize(data: Menus): unknown {
    return {
      footer: data.footer?.serialize() ?? null,
      sideBarBottom: data.sideBarBottom?.serialize() ?? null,
      sideBarTop: data.sideBarTop?.serialize() ?? null
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deserialize(data: any): Menus {
    return {
      footer: data.footer && CMSSerializableContentModel.deserialize(data.footer),
      sideBarBottom: data.sideBarBottom && CMSSerializableContentModel.deserialize(data.sideBarBottom),
      sideBarTop: data.sideBarTop && CMSSerializableContentModel.deserialize(data.sideBarTop)
    };
  }
}
