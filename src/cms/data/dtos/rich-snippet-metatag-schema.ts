import { ExposeAll } from "@schema-data-loader/core/decorators";
import { Type } from "class-transformer";
import type { DataModel } from "@/src/shared/data/models/data-model";
import { RichSnippetMetatag } from "@/src/cms/domain/models/rich-snippet-metatag";

@ExposeAll()
export class RichSnippetMetatagAttributesSchema {
  name = "";
  content = "";
  group = "";
  schema_metatag = false;
}

@ExposeAll()
export class RichSnippetMetatagSchema implements DataModel<RichSnippetMetatag> {
  tag = "";
  @Type(() => RichSnippetMetatagAttributesSchema)
  attributes = new RichSnippetMetatagAttributesSchema();

  toDomain(): RichSnippetMetatag {
    return new RichSnippetMetatag({
      tag: this.tag,
      name: this.attributes.name,
      content: this.attributes.content,
      group: this.attributes.group,
      schemaMetatag: this.attributes.schema_metatag
    });
  }
}
