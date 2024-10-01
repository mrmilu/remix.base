import { ExposeAll } from "@schema-data-loader/core/decorators";
import { FieldText, FieldTextLinkSingle } from "@/src/cms/domain/models/field-text";
import { Transform } from "class-transformer";
import type { DataModel } from "@/src/shared/data/models/data-model";
import urlParser from "@/src/shared/data/transformers/url-parser";

@ExposeAll()
export class FieldTextSchema implements DataModel<FieldText> {
  value = "";
  format = "";
  processed = "";

  toDomain(): FieldText {
    return new FieldText({
      value: this.value,
      format: this.format,
      processed: this.processed
    });
  }
}

@ExposeAll()
export class FieldTextLinkSingleSchema implements DataModel<FieldTextLinkSingle> {
  text = "";
  format = "";
  link = "";
  @Transform(({ value }) => urlParser(value))
  url = "";

  toDomain(): FieldTextLinkSingle {
    return new FieldTextLinkSingle({
      text: this.text,
      format: this.format,
      link: this.url
    });
  }
}
