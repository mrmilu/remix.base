import { ExposeAll } from "@schema-data-loader/core/decorators";
import { Type } from "class-transformer";
import type { DataModel } from "@/src/shared/data/models/data-model";
import { CMSAlias } from "@/src/cms/domain/models/cms-alias";

@ExposeAll()
export class CMSPathSchema {
  alias = "";
}

@ExposeAll()
export class CMSAliasSchema implements DataModel<CMSAlias> {
  @Type(() => CMSPathSchema)
  path = new CMSPathSchema();

  toDomain(): CMSAlias {
    return new CMSAlias({
      url: this.path?.alias
    });
  }
}
