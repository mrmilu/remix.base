import type { GetCMSSiteSettingsUseCase, SiteSettings } from "@/src/cms/application/use-cases/get-cms-site-settings-use-case";
import { fallbackLng, type Languages } from "@/src/shared/presentation/i18n";
import { CMSSerializableContentModel } from "@/src/cms/domain/models/cms-content-model";
import type { SsrDataFactory, LogAndSaveError } from "@/src/shared/ssr/ssr_data_factory";
import type { CacheHeadersBuilder } from "@/src/shared/domain/models/cache-headers-builder";
import { locator } from "@/ioc/__generated__";
import type { IocProvider } from "@/ioc/interfaces";
import { TYPES } from "@/ioc/__generated__/types";

export class CmsSiteSettingsSSRFactory implements SsrDataFactory<CMSSerializableContentModel | null> {
  setting: SiteSettings;
  key: string;

  constructor(
    setting: SiteSettings,
    private readonly language: Languages = fallbackLng,
    private readonly cacheHeadersBuilder: CacheHeadersBuilder | null = null
  ) {
    this.setting = setting;
    this.key = CmsSiteSettingsSSRFactory.getKey(setting);
  }

  async create(logError: LogAndSaveError) {
    try {
      const useCase = await locator.get<IocProvider<GetCMSSiteSettingsUseCase>>(TYPES.GetCMSSiteSettingsUseCase)();
      return await useCase.execute(this.language, this.cacheHeadersBuilder, this.setting);
    } catch (e) {
      logError(this.key, e);
    }
    return null;
  }
  serialize = (data: CMSSerializableContentModel | null) => {
    return data?.serialize() ?? null;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deserialize = (serializedData: any) => serializedData && CMSSerializableContentModel.deserialize(serializedData);

  static getKey = (setting: SiteSettings) => "cmsSiteSettings." + setting;
}
