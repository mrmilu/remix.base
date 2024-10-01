import { Entity, ExposeAll } from "@schema-data-loader/core/decorators";
import { Type } from "class-transformer";
import { FieldTextSchema } from "@/src/cms/data/dtos/field-text-schema";
import { FileSchema } from "@/src/cms/data/dtos/file-schema";
import { BlockHomeFooter } from "@/src/cms/domain/models/home/block-home-footer";
import type { DataModel } from "@/src/shared/data/models/data-model";

@ExposeAll({ nameCasing: "snakeCase" })
export class BlockHomeFooterSchema implements DataModel<BlockHomeFooter> {
  type = "block_content--block_home_footer";
  @Type(() => FieldTextSchema)
  fieldBodyBottom? = new FieldTextSchema();
  @Type(() => FieldTextSchema)
  fieldBodyTop? = new FieldTextSchema();
  @Entity()
  @Type(() => FileSchema)
  fieldImage? = new FileSchema();
  fieldTitle? = "";

  toDomain(): BlockHomeFooter {
    return new BlockHomeFooter({
      title: this.fieldTitle,
      bodyTop: this.fieldBodyTop?.toDomain(),
      bodyBottom: this.fieldBodyBottom?.toDomain(),
      image: this.fieldImage?.toDomain()
    });
  }
}
