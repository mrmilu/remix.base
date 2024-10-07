import type { ConstructorType } from "@/src/shared/domain/types/constructor-type";
import type { CMSHome } from "@/src/cms/domain/models/cms-home";

export class MetaTag {
  title?: string;
  description?: string;
  entityQueue?: CMSHome;

  constructor(params: ConstructorType<MetaTag>) {
    this.title = params.title;
    this.description = params.description;
    this.entityQueue = params.entityQueue;
  }
}
