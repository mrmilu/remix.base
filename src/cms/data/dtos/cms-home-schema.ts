import { Entity, ExposeAll, Union } from "@schema-data-loader/core/decorators";
import { BlockHomeIntroSchema } from "@/src/cms/data/dtos/home/block-home-intro-schema";
import type { DataModel } from "@/src/shared/data/models/data-model";
import { CMSHome } from "@/src/cms/domain/models/cms-home";
import { BlockHomeFooterSchema } from "@/src/cms/data/dtos/home/block-home-footer-schema";
import { Datalayer } from "@/src/cms/domain/models/datalayer";
import { Type } from "class-transformer";
import { RichSnippetMetatagSchema } from "@/src/cms/data/dtos/rich-snippet-metatag-schema";

@ExposeAll({ nameCasing: "snakeCase" })
export class CMSHomeSchema implements DataModel<CMSHome> {
  @Type(() => Union, {
    discriminator: {
      property: "type",
      subTypes: [
        { value: BlockHomeIntroSchema, name: "block_content--block_home_intro" },
        { value: BlockHomeFooterSchema, name: "block_content--block_home_footer" }
      ]
    }
  })
  @Entity()
  items?: Array<BlockHomeIntroSchema | BlockHomeFooterSchema> = [];
  @Type(() => RichSnippetMetatagSchema)
  metatag: Array<RichSnippetMetatagSchema> = [];
  toDomain(): CMSHome {
    return new CMSHome({
      items: this.items?.map((p) => p.toDomain()) ?? [],
      richSnippets: this.metatag.map((e) => e.toDomain()),
      dataLayer: new Datalayer({
        pageCategory: "(none)",
        pageSection: "home",
        pageType: "(none)"
      })
    });
  }
}
