import type { FieldTextLinkSingle } from "@/src/cms/domain/models/field-text";
import type { ConstructorType } from "@/src/shared/domain/types/constructor-type";

export class BlockLinkList {
  title?: string;
  columns?: number;
  links: Array<FieldTextLinkSingle>;
  constructor(params: ConstructorType<BlockLinkList>) {
    this.title = params.title;
    this.columns = params.columns;
    this.links = params.links;
  }
}
