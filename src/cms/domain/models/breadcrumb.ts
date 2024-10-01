import type { ConstructorType } from "@/src/shared/domain/types/constructor-type";

export class BreadcrumbItem {
  url: string;
  label: string;
  constructor(params: ConstructorType<BreadcrumbItem>) {
    this.url = params.url;
    this.label = params.label;
  }
}

export class Breadcrumb {
  visible: boolean;
  parents?: Array<BreadcrumbItem>;
  label?: string;

  constructor(params: ConstructorType<Breadcrumb>) {
    this.visible = params.visible;
    this.parents = params.parents;
    this.label = params.label;
  }
}
