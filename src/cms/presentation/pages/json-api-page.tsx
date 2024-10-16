import type { CMSSerializableContentModel } from "@/src/cms/domain/models/cms-content-model";
import { CmsContentForPathSSRFactory } from "@/src/cms/ssr/cms_content_for_path_ssr_factory";
import { useSsrData } from "@/src/cms/presentation/providers/ssr-data-provider";
import { CmsHreflangsSsrFactory } from "@/src/cms/ssr/cms_hreflangs_ssr_factory";
import { safeJsonStringify } from "@/src/shared/data/transformers/safe-json-stringify";
import { useState } from "react";
import { Button } from "@/src/shared/presentation/components/button/button";
import { logError } from "@/src/shared/data/services/logger";

export function JsonApiPage() {
  // forceError variable is used for demo purposes to demonstrate error handling using safe functions
  const [forceError, setForceError] = useState(false);

  const cmsContentContainer = useSsrData<CMSSerializableContentModel>(CmsContentForPathSSRFactory.getKey())
    .map((serializedValue) => {
      return serializedValue.toDomain();
    })
    .unwrapOr({ content: null }); // We define a default value but we could control the error and show something different

  const hrefLangs = useSsrData<CmsHreflangsSsrFactory>(CmsHreflangsSsrFactory.getKey()).unwrapOr(null);

  const { content } = cmsContentContainer;

  const stringifiedContentResult = safeJsonStringify(
    {
      ...(forceError ? { bigInt: BigInt(9007199254740991) } : {}),
      content,
      hrefLangs
    },
    null,
    4
  );

  if (stringifiedContentResult.isErr()) {
    logError(stringifiedContentResult.error);

    return <div style={{ color: "crimson" }}>Error parsing JSON</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginTop: "24px" }}>
      <Button type="button" onClick={() => setForceError(true)}>
        Force Error
      </Button>
      <pre>{stringifiedContentResult.value}</pre>
    </div>
  );
}
