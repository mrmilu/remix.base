import type { ConstructorType } from "@/src/shared/domain/types/constructor-type";

export class CMSAlias {
  url: string;

  constructor(params: ConstructorType<CMSAlias>) {
    this.url = params.url;
  }
}
