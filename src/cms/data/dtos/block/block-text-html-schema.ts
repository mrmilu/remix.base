import { ExposeAll } from "@schema-data-loader/core/decorators";
import { Type } from "class-transformer";
import { FieldTextSchema } from "@/src/cms/data/dtos/field-text-schema";
import { BlockTextHTML } from "@/src/cms/domain/models/block/block-text-html";
import {
  blockTextHtmlLayoutTypeDataModelToDomain,
  type BlockTextHtmlLayoutTypeDataModel
} from "@/src/cms/data/dtos/block/block-text-html-layout-type-schema";
import { FileSchema } from "@/src/cms/data/dtos/file-schema";
import type { DataModel } from "@/src/shared/data/models/data-model";

@ExposeAll({ nameCasing: "snakeCase" })
export class BlockTextHTMLSchema implements DataModel<BlockTextHTML> {
  type = "";

  @Type(() => FieldTextSchema)
  fieldBody? = new FieldTextSchema();

  @Type(() => FileSchema)
  fieldImageMedia? = new FileSchema();

  fieldTextHtmlLayout?: BlockTextHtmlLayoutTypeDataModel = "only_text";

  toDomain(): BlockTextHTML {
    return new BlockTextHTML({
      body: (this.fieldBody ?? new FieldTextSchema()).toDomain(),
      image: (this.fieldImageMedia ?? new FileSchema()).toDomain(),
      textHtmlLayout: blockTextHtmlLayoutTypeDataModelToDomain(this.fieldTextHtmlLayout)
    });
  }
}
