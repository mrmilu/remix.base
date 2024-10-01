import type { ConstructorType } from "@/src/shared/domain/types/constructor-type";

export class FieldText {
  value: string;
  format: string;
  processed: string;

  constructor(params: ConstructorType<FieldText>) {
    this.value = params.value;
    this.format = params.format;
    this.processed = params.processed;
  }
}

export class FieldTextLinkSingle {
  text: string;
  format: string;
  link: string;

  constructor(params: ConstructorType<FieldTextLinkSingle>) {
    this.text = params.text;
    this.format = params.format;
    this.link = params.link;
  }
}
