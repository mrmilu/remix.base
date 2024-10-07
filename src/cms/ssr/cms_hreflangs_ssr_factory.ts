import { createEmptyCmsHrefLangsModel, type CmsHrefLangsModel } from "@/src/cms/domain/models/cms-href-langs-model";
import { fallbackLng, type Languages } from "@/src/shared/presentation/i18n";
import type { GetCMSHreflangURLsUseCase } from "@/src/cms/application/use-cases/get-cms-hreflang-urls-use-case";
import type { SsrDataFactory, LogAndSaveError } from "@/src/shared/ssr/ssr_data_factory";
import type { CacheHeadersBuilder } from "@/src/shared/domain/models/cache-headers-builder";
import { locator } from "@/ioc/__generated__";
import type { IocProvider } from "@/ioc/interfaces";
import { TYPES } from "@/ioc/__generated__/types";

export class CmsHreflangsSsrFactory implements SsrDataFactory<CmsHrefLangsModel> {
  static getKey = () => "cmsHreflangs";

  key = CmsHreflangsSsrFactory.getKey();

  constructor(
    private readonly path: string = "",
    private readonly language: Languages = fallbackLng,
    private readonly cacheHeadersBuilder: CacheHeadersBuilder | null = null
  ) {}

  async create(logAndSaveError: LogAndSaveError) {
    try {
      const useCase = await locator.get<IocProvider<GetCMSHreflangURLsUseCase>>(TYPES.GetCMSHreflangURLsUseCase)();
      return await useCase.execute(this.path, this.language, this.cacheHeadersBuilder);
    } catch (error) {
      logAndSaveError(this.key, error);
      return createEmptyCmsHrefLangsModel();
    }
  }
  serialize = (data: CmsHrefLangsModel) => data;
  deserialize = (serializedData: unknown) => serializedData as CmsHrefLangsModel;
}
