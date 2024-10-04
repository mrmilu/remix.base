import type { TitleWithFormat } from "@/src/cms/domain/models/title-with-format";
import type { ConstructorType } from "@/src/shared/domain/types/constructor-type";
import type { FieldText } from "@/src/cms/domain/models/field-text";

export class ParagraphListWrapper {
  backgroundColor?: string;
  subtitle?: FieldText;
  body?: FieldText;
  footer?: FieldText;
  title?: TitleWithFormat;
  faqAccordion?: string;
  faqDisplayMode?: string;
  constructor(params: ConstructorType<ParagraphListWrapper>) {
    this.backgroundColor = params.backgroundColor;
    this.subtitle = params.subtitle;
    this.body = params.body;
    this.footer = params.footer;
    this.title = params.title;
    this.faqAccordion = params.faqAccordion;
    this.faqDisplayMode = params.faqDisplayMode;
  }
}
