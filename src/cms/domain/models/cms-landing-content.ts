import type { ConstructorType } from "@/src/shared/domain/types/constructor-type";
import type { RichSnippetMetatag } from "./rich-snippet-metatag";
import type { Datalayer } from "./datalayer";
import type { Breadcrumb } from "./breadcrumb";
import type { MediaImage } from "./media-image";
import type { FieldText } from "./field-text";

export class CMSLandingContent {
  title: string;
  htmlTitle?: FieldText;
  description?: string;
  body?: FieldText;
  headerImage?: MediaImage;
  layout?: string;
  breadcrumbs: Breadcrumb;
  dataLayer: Datalayer;
  richSnippets?: Array<RichSnippetMetatag>;

  constructor(params: ConstructorType<CMSLandingContent>) {
    this.title = params.title;
    this.htmlTitle = params.htmlTitle;
    this.description = params.description;
    this.body = params.body;
    this.headerImage = params.headerImage;
    this.layout = params.layout;
    this.breadcrumbs = params.breadcrumbs;
    this.dataLayer = params.dataLayer;
    this.richSnippets = params.richSnippets;
  }
}
