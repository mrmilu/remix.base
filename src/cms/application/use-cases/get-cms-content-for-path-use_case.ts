import type { ICMSRepository } from "@/src/cms/domain/interfaces/cms-repository";
import { GetRoutePathDataInputModel } from "@/src/cms/domain/models/get-route-path-data-model";
import { type Languages, fallbackLng } from "@/src/shared/presentation/i18n";
import { inject, injectable } from "inversify";
import type { CMSSerializableContentModel } from "@/src/cms/domain/models/cms-content-model";
import type { CacheHeadersBuilder } from "@/src/shared/domain/models/cache-headers-builder";
import { locator } from "@/ioc/__generated__";
import type { IEnvVars } from "@/src/shared/domain/interfaces/env-vars";
import type { IocProvider } from "@/ioc/interfaces";
import { TYPES } from "@/ioc/__generated__/types";

@injectable()
export class GetCMSContentForPathUseCase {
  @inject(TYPES.ICMSRepository) private readonly cmsRepositoryProvider!: IocProvider<ICMSRepository>;

  async execute(path: string, language: Languages, cacheHeadersBuilder: CacheHeadersBuilder | null): Promise<CMSSerializableContentModel> {
    const repository = await this.cmsRepositoryProvider();
    const cmsRouterPath = await repository.routerTranslatePath(path, language);
    const originalPath = cmsRouterPath.jsonapi.individual;

    const cmsApiUrl = locator.get<IEnvVars>(TYPES.IEnvVars).cmsApiUrl;

    return repository.getRouterPathData(
      new GetRoutePathDataInputModel({
        url:
          language === fallbackLng
            ? originalPath
            : [
                originalPath.slice(0, cmsApiUrl.length),
                originalPath.includes(language) ? "" : `/${language}`,
                originalPath.slice(cmsApiUrl.length)
              ].join(""),
        entityBundle: cmsRouterPath.entity.bundle,
        language,
        cacheHeadersBuilder
      })
    );
  }
}
