import type { ConstructorType } from "@/src/shared/domain/types/constructor-type";
import type { BlockHomeIntro } from "@/src/cms/domain/models/home/block-home-intro";
import type { BlockHomeFooter } from "@/src/cms/domain/models/home/block-home-footer";
import type { Datalayer } from "@/src/cms/domain/models/datalayer";
import type { RichSnippetMetatag } from "@/src/cms/domain/models/rich-snippet-metatag";

export class CMSHome {
  items?: Array<BlockHomeIntro | BlockHomeFooter>;
  dataLayer: Datalayer;
  richSnippets?: Array<RichSnippetMetatag>;

  constructor(params: ConstructorType<CMSHome>) {
    this.items = params.items;
    this.dataLayer = params.dataLayer;
    this.richSnippets = params.richSnippets;
  }
}
