import { handlePromiseError } from "@/src/shared/presentation/utils/promise";
import type { CacheHeadersBuilder } from "@/src/shared/domain/models/cache-headers-builder";
import type { Languages } from "@/src/shared/presentation/i18n";
import type { Menus } from "@/src/cms/domain/models/menus";
import type { GetCMSMenuUseCase } from "@/src/cms/application/use-cases/get-cms-menu-use-case";
import { inject, injectable } from "inversify";
import type { IocProvider } from "@/ioc/interfaces";
import { TYPES } from "@/ioc/__generated__/types";

@injectable()
export class GetBaseLayoutMenusUseCase {
  @inject(TYPES.GetCMSMenuUseCase) private readonly getCMSMenuForPathUseCase!: IocProvider<GetCMSMenuUseCase>;

  async execute(language: Languages, cacheHeadersBuilder: CacheHeadersBuilder | null): Promise<Menus> {
    const useCase = await this.getCMSMenuForPathUseCase();
    const [sideBarTop, sideBarBottom, footer] = await Promise.all([
      handlePromiseError(useCase.execute("sidebar-top", language, cacheHeadersBuilder)),
      handlePromiseError(useCase.execute("sidebar-bottom", language, cacheHeadersBuilder)),
      handlePromiseError(useCase.execute("footer", language, cacheHeadersBuilder))
    ]);
    return {
      sideBarTop,
      sideBarBottom,
      footer
    };
  }
}
