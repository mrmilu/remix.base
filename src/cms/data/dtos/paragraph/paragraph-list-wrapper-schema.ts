import { ExposeAll } from "@schema-data-loader/core/decorators";
import { ParagraphListWrapper } from "@/src/cms/domain/models/paragraph/paragraph-list-wrapper";
import { Type } from "class-transformer";
import { FieldTextSchema } from "@/src/cms/data/dtos/field-text-schema";
import type { DataModel } from "@/src/shared/data/models/data-model";

@ExposeAll({ nameCasing: "snakeCase" })
export class ParagraphListWrapperSchema implements DataModel<ParagraphListWrapper> {
  type = "";
  @Type(() => FieldTextSchema)
  fieldBody? = new FieldTextSchema();
  @Type(() => FieldTextSchema)
  fieldSubtitle? = new FieldTextSchema();
  @Type(() => FieldTextSchema)
  fieldFooter? = new FieldTextSchema();
  fieldTitle? = "";
  fieldContainerTitleTag? = "";
  fieldTitleOrientation? = "";
  fieldBackgroundColor = "";
  fieldFaqAccordionMode? = "";
  fieldFaqDisplayMode? = "";
  toDomain(): ParagraphListWrapper {
    return new ParagraphListWrapper({
      backgroundColor: this.fieldBackgroundColor,
      subtitle: this.fieldSubtitle?.toDomain(),
      body: this.fieldBody?.toDomain(),
      footer: this.fieldFooter?.toDomain(),
      title: {
        text: this.fieldTitle,
        tag: this.fieldContainerTitleTag,
        orientation: this.fieldTitleOrientation
      },
      faqAccordion: this.fieldFaqAccordionMode,
      faqDisplayMode: this.fieldFaqDisplayMode
    });
  }
}
