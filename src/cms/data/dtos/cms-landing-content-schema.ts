// eslint-disable-next-line unused-imports/no-unused-imports, @typescript-eslint/no-unused-vars
import { Entity, ExposeAll, Union } from "@schema-data-loader/core/decorators";
import { Type, Transform } from "class-transformer";
import { FieldTextSchema } from "@/src/cms/data/dtos/field-text-schema";
import { MediaImageSchema } from "@/src/cms/data/dtos/media-image-schema";
import { CMSLandingContent } from "@/src/cms/domain/models/cms-landing-content";
import { Breadcrumb, BreadcrumbItem } from "@/src/cms/domain/models/breadcrumb";
import { Datalayer } from "@/src/cms/domain/models/datalayer";
import { RichSnippetMetatagSchema } from "@/src/cms/data/dtos/rich-snippet-metatag-schema";
// import { BlockTextHTMLSchema } from "@/src/cms/data/dtos/block/block-text-html-schema";
// import { BlockOldHTMLSchema } from "@/src/cms/data/dtos/block/block-old-html-schema";
// import { BlockLinkListSchema } from "@/src/cms/data/dtos/block/block-link-list-schema";
import type { DataModel } from "@/src/shared/data/models/data-model";
// import { ParagraphListWrapperSchema } from "./paragraph/paragraph-list-wrapper-schema";

export function extractBreadcrumbs(obj: Record<string, never>, resultArray: Array<BreadcrumbItem> = []) {
  for (const key in obj) {
    if (key === "title") {
      const label = (obj["field_title_public"] as unknown as string) ?? (obj["title"] as unknown as string);
      const url = obj["path"] ? (obj["path"]["alias"] as unknown as string) : "#";
      resultArray.unshift(
        new BreadcrumbItem({
          label,
          url
        })
      );
    } else if (key === "field_breadcrumb_parent") {
      extractBreadcrumbs(obj[key], resultArray);
    }
  }
  return resultArray;
}

@ExposeAll({ nameCasing: "snakeCase" })
export class CMSLandingContentSchema implements DataModel<CMSLandingContent> {
  fieldTitlePublic = "";
  @Type(() => FieldTextSchema)
  fieldTitleHtml? = new FieldTextSchema();

  @Type(() => FieldTextSchema)
  fieldBody = new FieldTextSchema();

  @Entity()
  @Type(() => MediaImageSchema)
  fieldHeaderImgMedia? = new MediaImageSchema();

  fieldLandingLayout? = "";

  fieldHasBreadcrumbVisible? = false;

  fieldBreadcrumbLabel? = "";

  @Entity()
  @Type(() => CMSLandingContentSchema)
  @Transform((params) => extractBreadcrumbs(params.obj))
  fieldBreadcrumbParent? = undefined;

  fieldDatalayerCategory = "";

  // @Union({
  //   discriminatorProperty: "type",
  //   subTypes: [
  //     { value: ParagraphListWrapperSchema, name: "paragraph--container_car_list" },
  //     { value: ParagraphListWrapperSchema, name: "paragraph--container_table" },
  //     { value: ParagraphListWrapperSchema, name: "paragraph--container_review" },
  //     { value: ParagraphListWrapperSchema, name: "paragraph--container_location" },
  //     { value: ParagraphListWrapperSchema, name: "paragraph--container_base" },
  //     { value: ParagraphListWrapperSchema, name: "paragraph--container_card_big" },
  //     { value: ParagraphListWrapperSchema, name: "paragraph--container_miniblock_locality" },
  //     { value: ParagraphListWrapperSchema, name: "paragraph--container_miniblock_road" },
  //     { value: ParagraphListWrapperSchema, name: "paragraph--container_miniblock_info" },
  //     { value: ParagraphListWrapperSchema, name: "paragraph--container_miniblock_feature" },
  //     { value: ParagraphListWrapperSchema, name: "paragraph--container_miniblock_beach" },
  //     { value: ParagraphListWrapperSchema, name: "paragraph--container_features" },
  //     { value: ParagraphListWrapperSchema, name: "paragraph--container_type_list" },
  //     { value: ParagraphListWrapperSchema, name: "paragraph--container_location_list_big" },
  //     { value: ParagraphListWrapperSchema, name: "paragraph--container_faq" },
  //     { value: BlockOldHTMLSchema, name: "paragraph--block_old_html" },
  //     { value: BlockTextHTMLSchema, name: "paragraph--block_text_html" }
  //   ]
  // })
  // @Entity()
  // fieldContentParagraphs?: Array<ParagraphListWrapperSchema | BlockOldHTMLSchema | BlockTextHTMLSchema> = [];

  // @Union({
  //   discriminatorProperty: "type",
  //   subTypes: [
  //     { value: BlockOldHTMLSchema, name: "paragraph--block_old_html" },
  //     { value: BlockLinkListSchema, name: "paragraph--block_link_list" }
  //   ]
  // })
  // @Entity()
  // fieldSidebarParagraphs?: Array<BlockOldHTMLSchema | BlockLinkListSchema> = [];

  @Type(() => RichSnippetMetatagSchema)
  metatag: Array<RichSnippetMetatagSchema> = [];

  toDomain(): CMSLandingContent {
    return new CMSLandingContent({
      title: this.fieldTitlePublic,
      htmlTitle: this.fieldTitleHtml?.toDomain(),
      body: this.fieldBody?.toDomain(),
      headerImage: this.fieldHeaderImgMedia?.toDomain(),
      layout: this.fieldLandingLayout,
      breadcrumbs: new Breadcrumb({
        label: this.fieldBreadcrumbLabel,
        visible: this.fieldHasBreadcrumbVisible ?? false,
        parents: this.fieldBreadcrumbParent
      }),
      dataLayer: new Datalayer({
        pageCategory: this.fieldDatalayerCategory ?? "(none)",
        pageSection: "alquiler-de-coches",
        pageType: "landing-destinos"
      }),
      // fieldContentParagraphs: this.fieldContentParagraphs?.map((p) => p.toDomain()) ?? [],
      // fieldSidebarParagraphs: this.fieldSidebarParagraphs?.map((p) => p.toDomain()) ?? [],
      richSnippets: this.metatag.map((e) => e.toDomain())
    });
  }
}
