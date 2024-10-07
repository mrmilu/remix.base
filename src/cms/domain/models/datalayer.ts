import type { ConstructorType } from "@/src/shared/domain/types/constructor-type";

export class Datalayer {
  pageCategory: string;
  pageSection: string;
  pageType: string;
  constructor(params: ConstructorType<Datalayer>) {
    this.pageCategory = params.pageCategory;
    this.pageSection = params.pageSection;
    this.pageType = params.pageType;
  }
}
