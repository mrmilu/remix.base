import type { ConstructorType } from "@/src/shared/domain/types/constructor-type";
import type { File } from "@/src/cms/domain/models/file";

export class CMSMenuItem {
  enabled: boolean;
  title: string;
  url: string;
  fieldMenuIcon?: File;
  below: Array<CMSMenuItem>;

  constructor(params: ConstructorType<CMSMenuItem>) {
    this.fieldMenuIcon = params.fieldMenuIcon;
    this.title = params.title;
    this.enabled = params.enabled;
    this.url = params.url;
    this.below = params.below;
  }
}

export class CMSMenu {
  langcode: string;
  items: Array<CMSMenuItem>;
  constructor(params: ConstructorType<CMSMenu>) {
    this.langcode = params.langcode;
    this.items = params.items;
  }
}
