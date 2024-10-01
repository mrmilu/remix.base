import urlParser from "@/src/shared/data/transformers/url-parser";
import { CMSMenu, CMSMenuItem } from "@/src/cms/domain/models/cms-menu";
import type { DataModel } from "@/src/shared/data/models/data-model";
import { Entity, ExposeAll, HasEntity } from "@schema-data-loader/core/decorators";
import { Transform, Type } from "class-transformer";
import { FileSchema } from "@/src/cms/data/dtos/file-schema";

@ExposeAll({ nameCasing: "snakeCase" })
export class CMSMenuItemSchema implements DataModel<CMSMenuItem> {
  title = "";
  @Transform(({ value }) => urlParser(value))
  url = "";
  enabled = false;
  @Type(() => FileSchema)
  @Entity()
  fieldMenuIcon: FileSchema | null = null;
  @Type(() => CMSMenuItemSchema)
  below: Array<CMSMenuItemSchema> = [];

  toDomain(): CMSMenuItem {
    return new CMSMenuItem({
      title: this.title,
      url: this.url,
      fieldMenuIcon: this.fieldMenuIcon?.toDomain(),
      enabled: this.enabled,
      below: this.below.map((item) => item.toDomain())
    });
  }
}

@ExposeAll()
export class CMSMenuSchema implements DataModel<CMSMenu> {
  langcode = "";
  @HasEntity()
  @Type(() => CMSMenuItemSchema)
  items: Array<CMSMenuItemSchema> = [];

  toDomain(): CMSMenu {
    return new CMSMenu({
      langcode: this.langcode,
      items: this.items.map((item) => item.toDomain())
    });
  }
}
