import { fallbackLng, type Languages } from "@/src/shared/presentation/i18n";
import type { IocProvider } from "@/src/shared/ioc/interfaces";
import { TYPES } from "@/src/shared/ioc/__generated__/types";
import { CMSSerializableContentModel } from "@/src/cms/domain/models/cms-content-model";
import type { GetCMSContentForPathUseCase } from "@/src/cms/application/use-cases/get-cms-content-for-path-use_case";
import type { LogAndSaveError, SsrDataFactory } from "@/src/shared/ssr/ssr_data_factory";
import type { CacheHeadersBuilder } from "@/src/shared/domain/models/cache-headers-builder";
import { locator } from "@/ioc/__generated__";

export class CmsContentForPathSSRFactory implements SsrDataFactory<CMSSerializableContentModel | null> {
  static getKey = () => "cmsContentForPath";

  key = CmsContentForPathSSRFactory.getKey();

  constructor(
    private readonly path: string = "",
    private readonly language: Languages = fallbackLng,
    private readonly cacheHeadersBuilder: CacheHeadersBuilder | null = null
  ) {}

  async create(logAndSaveError: LogAndSaveError) {
    try {
      const useCase = await locator.get<IocProvider<GetCMSContentForPathUseCase>>(TYPES.GetCMSContentForPathUseCase)();
      return await useCase.execute(this.path, this.language, this.cacheHeadersBuilder);
    } catch (error) {
      logAndSaveError(this.key, error);
      return null;
    }
  }

  serialize(data: CMSSerializableContentModel | null): unknown {
    return data?.serialize() ?? null;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deserialize = (serializedData: any) => serializedData && CMSSerializableContentModel.deserialize(serializedData);
}
