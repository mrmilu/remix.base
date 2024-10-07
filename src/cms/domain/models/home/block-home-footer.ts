import type { ConstructorType } from "@/src/shared/domain/types/constructor-type";
import type { FieldText } from "@/src/cms/domain/models/field-text";
import type { File } from "@/src/cms/domain/models/file";

export class BlockHomeFooter {
  title?: string;
  bodyBottom?: FieldText;
  bodyTop?: FieldText;
  image?: File;
  constructor(params: ConstructorType<BlockHomeFooter>) {
    this.title = params.title;
    this.bodyBottom = params.bodyBottom;
    this.bodyTop = params.bodyTop;
    this.image = params.image;
  }
}
