import type { FieldText } from "@/src/cms/domain/models/field-text";
import type { ConstructorType } from "@/src/shared/domain/types/constructor-type";

export class BlockOldHTML {
  body?: FieldText;
  constructor(params: ConstructorType<BlockOldHTML>) {
    this.body = params.body;
  }
}
