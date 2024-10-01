import { CmsContentForPathSSRFactory } from "@/src/cms/ssr/cms_content_for_path_ssr_factory";
import { CmsHreflangsSsrFactory } from "@/src/cms/ssr/cms_hreflangs_ssr_factory";
import { CmsMenusSSRFactory } from "@/src/cms/ssr/cms_menus_ssr_factory";
import { CmsSiteSettingsSSRFactory } from "@/src/cms/ssr/cms_site_settings_ssr_factory";
import { CacheHeadersBuilder } from "@/src/shared/domain/models/cache-headers-builder";
import { fallbackLng, type Languages } from "@/src/shared/presentation/i18n";
import i18nServer from "@/src/shared/presentation/i18n/i18n.server";
import { isNotFoundAxiosError } from "@/src/shared/presentation/utils/axios";
import { IsMobileSsrFactory } from "@/src/shared/ssr/is_mobile_ssr_factory";
import type { SsrErrors } from "@/src/shared/ssr/ssr_data";
import { SsrDataBuilder } from "@/src/shared/ssr/ssr_data_builder";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

function isNotFound(errors: SsrErrors): boolean {
  const contentForPathError = errors[CmsContentForPathSSRFactory.getKey()];
  return Boolean(contentForPathError) && isNotFoundAxiosError(contentForPathError);
}

function getIsErrorPage(errors: SsrErrors): boolean {
  return Boolean(errors[CmsContentForPathSSRFactory.getKey()]);
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const language = ((await i18nServer.getLocale(request)) as Languages) || fallbackLng;
  const url = new URL(request.url);
  const path = url.pathname;
  const cacheHeadersBuilder = new CacheHeadersBuilder();

  const builder = new SsrDataBuilder([
    new CmsContentForPathSSRFactory(path, language, cacheHeadersBuilder),
    new CmsHreflangsSsrFactory(path, language, cacheHeadersBuilder),
    new CmsSiteSettingsSSRFactory("social_media_settings", language, cacheHeadersBuilder),
    new CmsMenusSSRFactory(language, cacheHeadersBuilder),
    new IsMobileSsrFactory(request.headers.get("user-agent") ?? undefined)
  ]);

  await builder.createData();
  builder.serializeData();

  const isNotFoundPage = isNotFound(builder.ssrErrors);
  if (isNotFoundPage) {
    return json(404);
  }

  const isErrorPage = getIsErrorPage(builder.ssrErrors);
  if (isErrorPage) {
    return json(500);
  }

  const cacheHeaders = cacheHeadersBuilder.getHeaders();

  return json(builder.ssrSerializedData, { status: 200, headers: { ...cacheHeaders } });
};

export default function Page() {
  const data = useLoaderData<typeof loader>();

  console.log(data);

  return <pre>{JSON.stringify(data)}</pre>;
}
