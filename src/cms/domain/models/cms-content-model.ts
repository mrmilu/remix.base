import type { ConstructorType } from "@/src/shared/domain/types/constructor-type";
import type { CMSContentTypeModel } from "@/src/cms/domain/models/cms-content-type-model";
import type { DataModel } from "@/src/shared/data/models/data-model";
import type { ClassConstructor } from "class-transformer";
import { fromJson, toJson } from "@/src/shared/data/utils/class-transformer";
import { entityBundleSchemaMap } from "@/src/cms/data/dtos/schema-type-map";

export class CMSSerializableContentModel {
  readonly serializableContent: DataModel<unknown>;
  readonly contentType?: CMSContentTypeModel;

  constructor({ serializableContent, contentType }: ConstructorType<CMSSerializableContentModel>) {
    this.serializableContent = serializableContent;
    this.contentType = contentType;
  }

  toDomain(): CMSContentModel {
    return new CMSContentModel({
      content: this.serializableContent.toDomain(),
      contentType: this.contentType
    });
  }

  serialize(): unknown {
    return {
      serializableContent: toJson(this.serializableContent),
      contentType: this.contentType
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static deserialize(serializedData: any): CMSSerializableContentModel {
    return new CMSSerializableContentModel({
      serializableContent: fromJson(
        entityBundleSchemaMap[serializedData.contentType as CMSContentTypeModel] as ClassConstructor<never>,
        serializedData.serializableContent
      ) as DataModel<unknown>,
      contentType: serializedData.contentType as CMSContentTypeModel
    });
  }
}

export class CMSContentModel {
  readonly content: unknown;
  readonly contentType?: CMSContentTypeModel;
  constructor({ content, contentType }: ConstructorType<CMSContentModel>) {
    this.content = content;
    this.contentType = contentType;
  }
}
