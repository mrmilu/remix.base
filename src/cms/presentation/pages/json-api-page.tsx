import type { CMSSerializableContentModel } from "@/src/cms/domain/models/cms-content-model";
import { CmsContentForPathSSRFactory } from "@/src/cms/ssr/cms_content_for_path_ssr_factory";
import { useSsrData } from "@/src/cms/presentation/providers/ssr-data-provider";
import { CmsHreflangsSsrFactory } from "@/src/cms/ssr/cms_hreflangs_ssr_factory";

export function JsonApiPage() {
  const data = useSsrData<CMSSerializableContentModel>(CmsContentForPathSSRFactory.getKey());
  const hrefLangs = useSsrData<CMSSerializableContentModel>(CmsHreflangsSsrFactory.getKey());

  const cmsContentModel = data.toDomain();
  const { content } = cmsContentModel;

  return <pre>{JSON.stringify({ content, hrefLangs })}</pre>;
}
