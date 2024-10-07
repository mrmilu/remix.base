import type { File } from "@/src/cms/domain/models/file";
import type { ConstructorType } from "@/src/shared/domain/types/constructor-type";

export class MediaImage {
  name: string;
  fieldMediaImage?: File;

  constructor(params: ConstructorType<MediaImage>) {
    this.name = params.name;
    this.fieldMediaImage = params.fieldMediaImage;
  }
}
