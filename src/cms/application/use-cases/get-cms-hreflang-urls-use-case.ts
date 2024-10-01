import type { ICMSRepository } from "@/src/cms/domain/interfaces/cms-repository";
import type { CMSAlias } from "@/src/cms/domain/models/cms-alias";
import { GetRoutePathDataInputModel } from "@/src/cms/domain/models/get-route-path-data-model";
import { supportedLngs, type Languages, getPathnameWithLanguage } from "@/src/shared/presentation/i18n";
import { inject, injectable } from "inversify";
import { createEmptyCmsHrefLangsModel, type CmsHrefLangsModel } from "@/src/cms/domain/models/cms-href-langs-model";
import type { CacheHeadersBuilder } from "@/src/shared/domain/models/cache-headers-builder";
import { TYPES } from "@/ioc/__generated__/types";
import type { IocProvider } from "@/ioc/interfaces";
import type { IEnvVars } from "@/src/shared/domain/interfaces/env-vars";

@injectable()
export class GetCMSHreflangURLsUseCase {
  @inject(TYPES.ICMSRepository) private readonly cmsRepositoryProvider!: IocProvider<ICMSRepository>;
  @inject(TYPES.IEnvVars) private readonly envVars!: IEnvVars;

  async execute(path: string, language: Languages, cacheHeadersBuilder: CacheHeadersBuilder | null): Promise<CmsHrefLangsModel> {
    const repository = await this.cmsRepositoryProvider();
    const cmsRouterPath = await repository.routerTranslatePath(path, language);
    const base: CmsHrefLangsModel = createEmptyCmsHrefLangsModel();

    await supportedLngs.reduce(async (promise, language: Languages) => {
      const url = `${this.envVars.cmsApiUrl}${getPathnameWithLanguage(
        language,
        `/jsonapi/${cmsRouterPath.entity.type}/${cmsRouterPath.entity.bundle}/${cmsRouterPath.entity.uuid}`
      )}`;
      await promise;
      const result = (
        await repository.getRouterPathData(
          new GetRoutePathDataInputModel({
            url: url,
            entityBundle: "alias",
            language: language,
            cacheHeadersBuilder
          })
        )
      ).serializableContent.toDomain() as CMSAlias;
      base[language] = getPathnameWithLanguage(language, result.url);
    }, Promise.resolve());

    return base;
  }
}
