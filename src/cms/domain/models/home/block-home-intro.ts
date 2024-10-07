import type { FieldText } from "@/src/cms/domain/models/field-text";
import type { File } from "@/src/cms/domain/models/file";
import type { ConstructorType } from "@/src/shared/domain/types/constructor-type";

export class BlockHomeIntro {
  title: string;
  body?: FieldText;
  backgroundImage?: File;
  creativityImage?: File;
  constructor(params: ConstructorType<BlockHomeIntro>) {
    this.title = params.title;
    this.backgroundImage = params.backgroundImage;
    this.creativityImage = params.creativityImage;
  }
}
