import { ExposeAll } from "@schema-data-loader/core/decorators";
import { Type } from "class-transformer";
import { BlockLinkList } from "@/src/cms/domain/models/block/block-link-list";
import { FieldTextLinkSingleSchema } from "@/src/cms/data/dtos/field-text-schema";
import type { DataModel } from "@/src/shared/data/models/data-model";

@ExposeAll({ nameCasing: "snakeCase" })
export class BlockLinkListSchema implements DataModel<BlockLinkList> {
  type = "";
  fieldBlockListLinkColumns? = 1;
  fieldTitle? = "";
  @Type(() => FieldTextLinkSingleSchema)
  fieldTextLinkMultiple: Array<FieldTextLinkSingleSchema> = [];

  toDomain(): BlockLinkList {
    return new BlockLinkList({
      title: this.fieldTitle,
      columns: this.fieldBlockListLinkColumns,
      links: this.fieldTextLinkMultiple?.map((p) => p.toDomain()) ?? []
    });
  }
}
