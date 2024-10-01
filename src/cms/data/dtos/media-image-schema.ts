import { Type } from "class-transformer";

import { FileSchema } from "@/src/cms/data/dtos/file-schema";
import { Entity, ExposeAll } from "@schema-data-loader/core/decorators";
import { MediaImage } from "@/src/cms/domain/models/media-image";
import type { DataModel } from "@/src/shared/data/models/data-model";

@ExposeAll({ nameCasing: "snakeCase" })
export class MediaImageSchema implements DataModel<MediaImage> {
  name = "";

  @Type(() => FileSchema)
  @Entity()
  fieldMediaImage: FileSchema | null = null;

  toDomain(): MediaImage {
    return new MediaImage({
      name: this.name,
      fieldMediaImage: this.fieldMediaImage?.toDomain()
    });
  }
}
