import { Entity, ExposeAll } from "@schema-data-loader/core/decorators";
import { Type } from "class-transformer";
import { FieldTextSchema } from "@/src/cms/data/dtos/field-text-schema";
import { MediaImageSchema } from "@/src/cms/data/dtos/media-image-schema";
import { CMSLandingContent } from "@/src/cms/domain/models/cms-landing-content";
import { Breadcrumb, BreadcrumbItem } from "@/src/cms/domain/models/breadcrumb";
import { Transform } from "class-transformer";
import { Datalayer } from "@/src/cms/domain/models/datalayer";
import { RichSnippetMetatagSchema } from "@/src/cms/data/dtos/rich-snippet-metatag-schema";
import type { DataModel } from "@/src/shared/data/models/data-model";

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

  fieldHasAmp? = false;
  @Type(() => FieldTextSchema)
  fieldAmpBody? = new FieldTextSchema();

  fieldLandingLayout? = "";

  fieldHasBreadcrumbVisible? = false;
  fieldBreadcrumbLabel? = "";

  @Entity()
  @Type(() => CMSLandingContentSchema)
  @Transform((params) => extractBreadcrumbs(params.obj))
  fieldBreadcrumbParent? = undefined;

  fieldDatalayerCategory = "";

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
      richSnippets: this.metatag.map((e) => e.toDomain())
    });
  }
}
