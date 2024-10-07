import { Entity, ExposeAll } from "@schema-data-loader/core/decorators";
import { Type } from "class-transformer";
import { FieldTextSchema } from "@/src/cms/data/dtos/field-text-schema";
import { BlockHomeIntro } from "@/src/cms/domain/models/home/block-home-intro";
import type { DataModel } from "@/src/shared/data/models/data-model";
import { FileSchema } from "../file-schema";

@ExposeAll({ nameCasing: "snakeCase" })
export class BlockHomeIntroSchema implements DataModel<BlockHomeIntro> {
  type? = "block_content--block_home_intro";

  fieldSomething? = "block_content--block_home_intro";
  @Type(() => FieldTextSchema)
  fieldBody? = new FieldTextSchema();
  @Entity()
  @Type(() => FileSchema)
  fieldImageCreativity? = new FileSchema();
  @Entity()
  @Type(() => FileSchema)
  fieldImageBackground? = new FileSchema();
  fieldTitle = "";

  toDomain(): BlockHomeIntro {
    return new BlockHomeIntro({
      title: this.fieldTitle,
      body: this.fieldBody?.toDomain(),
      backgroundImage: this.fieldImageBackground?.toDomain(),
      creativityImage: this.fieldImageCreativity?.toDomain()
    });
  }
}
