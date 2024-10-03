import type { CMSSerializableContentModel } from "@/src/cms/domain/models/cms-content-model";
import { JsonApiPage } from "@/src/cms/presentation/pages/json-api-page";
import { SsrDataProvider } from "@/src/cms/presentation/providers/ssr-data-provider";
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
import { json, type MetaFunction, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export default function Page() {
  const data = useLoaderData<typeof loader>();

  const builder = new SsrDataBuilder([
    new CmsContentForPathSSRFactory(),
    new CmsHreflangsSsrFactory(),
    new CmsSiteSettingsSSRFactory("social_media_settings"),
    new CmsMenusSSRFactory(),
    new IsMobileSsrFactory()
  ]);

  return (
    <SsrDataProvider builder={builder} ssrSerializedData={data}>
      <JsonApiPage />
    </SsrDataProvider>
  );
}

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
    throw new Response(null, {
      status: 404,
      statusText: "Not Found"
    });
  }

  const isErrorPage = getIsErrorPage(builder.ssrErrors);
  if (isErrorPage) {
    throw new Response(null, {
      status: 500,
      statusText: "Internal Server Error"
    });
  }

  const cacheHeaders = cacheHeadersBuilder.getHeaders();

  return json(builder.ssrSerializedData, { status: 200, headers: { ...cacheHeaders } });
};

interface MetadataProp {
  title: string;
  description: string;
  amp: {
    enabled: boolean;
  };
  headerImage: {
    fieldMediaImage: {
      imageStyleUri: {
        imageWebp: string;
      };
    };
  };
}

const hasTitle = (obj: unknown): obj is MetadataProp => {
  return typeof obj === "object" && obj !== null && "title" in obj;
};

const hasDescription = (obj: unknown): obj is MetadataProp => {
  return typeof obj === "object" && obj !== null && "description" in obj;
};

const hasHeaderImage = (obj: unknown): obj is MetadataProp => {
  return typeof obj === "object" && obj !== null && "headerImage" in obj;
};

export const meta: MetaFunction<typeof loader> = ({ location, data }) => {
  const builder = new SsrDataBuilder([
    new CmsContentForPathSSRFactory(),
    new CmsHreflangsSsrFactory(),
    new CmsSiteSettingsSSRFactory("social_media_settings"),
    new CmsMenusSSRFactory(),
    new IsMobileSsrFactory()
  ]);

  const copiedData = JSON.parse(JSON.stringify(data));
  builder.deserializeData(copiedData);

  const path = Array.isArray(location.pathname) ? location.pathname.join("/") : "";

  const hrefLangs = builder.ssrData[CmsHreflangsSsrFactory.getKey()];

  const contentForPath: CMSSerializableContentModel = builder.ssrData[CmsContentForPathSSRFactory.getKey()] as CMSSerializableContentModel;

  const content = contentForPath?.toDomain().content;

  return [
    {
      title: hasTitle(content) ? content.title : undefined,
      description: hasDescription(content) ? content.description : undefined,
      headerImageURL: hasHeaderImage(content) ? content.headerImage?.fieldMediaImage?.imageStyleUri?.imageWebp : "/assets/images/header.webp",
      hrefLang: hrefLangs ?? undefined,
      path
    }
  ];
};
