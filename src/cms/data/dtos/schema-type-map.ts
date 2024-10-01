import type { ClassConstructor } from "class-transformer/types/interfaces";
import { CMSMenuSchema } from "@/src/cms/data/dtos/cms-menu-schema";
import { SocialNetworksSchema } from "@/src/cms/data/dtos/social-networks-schema";
import { MetaTagsSchema } from "@/src/cms/data/dtos/metatags-schema";
import { CMSHomeSchema } from "@/src/cms/data/dtos/cms-home-schema";
import { CMSAliasSchema } from "@/src/cms/data/dtos/cms-alias-schema";
import { CMSLandingContentSchema } from "@/src/cms/data/dtos/cms-landing-content-schema";

import type { CMSContentTypeModel } from "@/src/cms/domain/models/cms-content-type-model";

export const entityBundleSchemaMap: Record<CMSContentTypeModel, ClassConstructor<unknown>> = {
  alias: CMSAliasSchema,
  homeMetatagsSettings: MetaTagsSchema,
  home: CMSHomeSchema,
  menu: CMSMenuSchema,
  socialMediaSettings: SocialNetworksSchema,
  simplePage: CMSLandingContentSchema
};
