import type { ICMSRepository } from "@/src/cms/domain/interfaces/cms-repository";
import { GetRoutePathDataInputModel } from "@/src/cms/domain/models/get-route-path-data-model";
import type { Languages } from "@/src/shared/presentation/i18n";
import { getPathnameWithLanguage } from "@/src/shared/presentation/i18n";
import { inject, injectable } from "inversify";
import type { CMSSerializableContentModel } from "@/src/cms/domain/models/cms-content-model";
import type { CacheHeadersBuilder } from "@/src/shared/domain/models/cache-headers-builder";
import { TYPES } from "@/ioc/__generated__/types";
import type { IocProvider } from "@/ioc/interfaces";

@injectable()
export class GetCMSMenuUseCase {
  @inject(TYPES.ICMSRepository) private readonly cmsRepositoryProvider!: IocProvider<ICMSRepository>;

  async execute(path: string, language: Languages, cacheHeadersBuilder: CacheHeadersBuilder | null): Promise<CMSSerializableContentModel> {
    const repository = await this.cmsRepositoryProvider();
    return await repository.getRouterPathData(
      new GetRoutePathDataInputModel({
        url: getPathnameWithLanguage(language, `/jsonapi/jsonapi_menu/${path}`),
        entityBundle: "menu",
        language: language,
        cacheHeadersBuilder
      })
    );
  }
}
