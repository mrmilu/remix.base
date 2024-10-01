import { Entity, ExposeAll } from "@schema-data-loader/core/decorators";
import type { DataModel } from "@/src/shared/data/models/data-model";
import { MetaTag } from "@/src/cms/domain/models/metatag";
import { Type } from "class-transformer";
import { CMSHomeSchema } from "@/src/cms/data/dtos/cms-home-schema";

@ExposeAll({ nameCasing: "snakeCase" })
export class MetaTagsSchema implements DataModel<MetaTag> {
  description? = "";
  title? = "";
  @Type(() => CMSHomeSchema)
  @Entity()
  entityQueue? = new CMSHomeSchema();

  toDomain(): MetaTag {
    return new MetaTag({
      description: this.description,
      title: this.title,
      entityQueue: this.entityQueue?.toDomain()
    });
  }
}
