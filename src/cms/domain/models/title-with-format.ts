import type { ConstructorType } from "@/src/shared/domain/types/constructor-type";

export class TitleWithFormat {
  text?: string;
  tag?: string;
  orientation?: string;

  constructor(params: ConstructorType<TitleWithFormat>) {
    this.text = params.text;
    this.tag = params.tag;
    this.orientation = params.orientation;
  }
}
