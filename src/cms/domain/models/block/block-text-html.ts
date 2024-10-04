import type { FieldText } from "@/src/cms/domain/models/field-text";
import type { File } from "@/src/cms/domain/models/file";
import type { BlockTextHtmlLayoutType } from "@/src/cms/domain/models/block/block-text-html-layout-type";
import type { ConstructorType } from "@/src/shared/domain/types/constructor-type";

export class BlockTextHTML {
  body: FieldText;
  image: File;
  textHtmlLayout: BlockTextHtmlLayoutType;

  constructor(params: ConstructorType<BlockTextHTML>) {
    this.body = params.body;
    this.image = params.image;
    this.textHtmlLayout = params.textHtmlLayout;
  }
}
