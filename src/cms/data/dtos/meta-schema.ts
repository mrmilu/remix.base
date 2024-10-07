import type { DataModel } from "@/src/shared/data/models/data-model";
import { ExposeAll } from "@schema-data-loader/core/decorators";
import { Meta } from "@/src/cms/domain/models/meta";

@ExposeAll({ nameCasing: "snakeCase" })
export class MetaSchema implements DataModel<Meta> {
  alt? = "";
  title? = "";

  toDomain(): Meta {
    return new Meta({
      alt: this.alt,
      title: this.title
    });
  }
}
