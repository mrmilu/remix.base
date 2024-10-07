import { CMSContentTypeModel } from "@/src/cms/domain/models/cms-content-type-model";

export const toDomainMap: Record<string, CMSContentTypeModel> = {
  alias: CMSContentTypeModel.alias,
  home_metatags_settings: CMSContentTypeModel.homeMetatagsSettings,
  home: CMSContentTypeModel.home,
  menu: CMSContentTypeModel.menu,
  social_media_settings: CMSContentTypeModel.socialMediaSettings,
  simple_page: CMSContentTypeModel.simplePage
};

export class CMSContentTypeDTO {
  constructor(private readonly entityBundle: string) {}
  toDomain(): CMSContentTypeModel | undefined {
    return CMSContentTypeModel[toDomainMap[this.entityBundle]];
  }
}
