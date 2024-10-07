import type { ConstructorType } from "@/src/shared/domain/types/constructor-type";

export class Meta {
  title?: string;
  alt?: string;

  constructor(params: ConstructorType<Meta>) {
    this.title = params.title;
    this.alt = params.alt;
  }
}
