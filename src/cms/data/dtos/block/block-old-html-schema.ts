import { ExposeAll } from "@schema-data-loader/core/decorators";
import { Type } from "class-transformer";
import { FieldTextSchema } from "@/src/cms/data/dtos/field-text-schema";
import { BlockOldHTML } from "@/src/cms/domain/models/block/block-old-html";
import type { DataModel } from "@/src/shared/data/models/data-model";

@ExposeAll({ nameCasing: "snakeCase" })
export class BlockOldHTMLSchema implements DataModel<BlockOldHTML> {
  type = "";
  @Type(() => FieldTextSchema)
  fieldBody? = new FieldTextSchema();

  toDomain(): BlockOldHTML {
    return new BlockOldHTML({
      body: this.fieldBody?.toDomain()
    });
  }
}
