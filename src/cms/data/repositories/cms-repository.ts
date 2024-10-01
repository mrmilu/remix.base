import { inject, injectable } from "inversify";

import type { ICMSRepository } from "@/src/cms/domain/interfaces/cms-repository";
import type { CreateContactFormInputModel } from "@/src/cms/domain/models/create-contact-form-input-model";
import { TYPES } from "@/ioc/__generated__/types";
import type { IocProvider } from "@/ioc/interfaces";
import type { CMSService } from "@/src/cms/data/services/cms-service";
import { fromJson } from "@/src/shared/data/utils/class-transformer";
import { getPathnameWithLanguage, type Languages } from "@/src/shared/presentation/i18n";
import type { CMSRouterPath } from "@/src/cms/domain/models/cms-router-path";
import { CMSRouterPathDataModel } from "@/src/cms/data/dtos/router-path";
import type { CacheHeadersBuilder } from "@/src/shared/domain/models/cache-headers-builder";
import type { ClassConstructor } from "class-transformer";
import type { DataModel } from "@/src/shared/data/models/data-model";
import { AxiosError } from "axios";
import type { IEntityResolverFactory } from "@/src/shared/domain/interfaces/entity-resolver";
import { CMSContentTypeDTO } from "@/src/cms/data/dtos/cms-content-type";
import { entityBundleSchemaMap } from "@/src/cms/data/dtos/schema-type-map";
import { AppError, AppErrorCodes } from "@/src/shared/domain/models/app-error";
import { CMSSerializableContentModel } from "@/src/cms/domain/models/cms-content-model";
import type { GetRoutePathDataInputModel } from "@/src/cms/domain/models/get-route-path-data-model";

@injectable()
export class CMSRepository implements ICMSRepository {
  @inject(TYPES.CMSService) private cmsServiceProvider!: IocProvider<CMSService>;
  @inject(TYPES.IEntityResolverFactory) private entityResolverFactory!: IEntityResolverFactory;

  async postContactForm(input: CreateContactFormInputModel) {
    const cmsService = await this.cmsServiceProvider();
    await cmsService.post(`/api/1.0/contact-form`, {
      data: input
    });
  }

  async routerTranslatePath(path: string, language: Languages): Promise<CMSRouterPath> {
    const cmsService = await this.cmsServiceProvider();
    const response = await cmsService.get<Record<string, unknown>>(getPathnameWithLanguage(language, "/router/translate-path/"), {
      params: { path }
    });
    return fromJson<CMSRouterPathDataModel>(CMSRouterPathDataModel, response).toDomain();
  }

  async getCMSContentWithSchema(
    url: string,
    schema: ClassConstructor<unknown>,
    language: Languages,
    cacheHeadersBuilder: CacheHeadersBuilder | null
  ): Promise<DataModel<unknown>> {
    const cmsService = await this.cmsServiceProvider();
    const entityResolver = this.entityResolverFactory.create(language, cacheHeadersBuilder);
    const response = await cmsService.get<{ data: object }>(url);
    this.checkLanguage(response, language);
    return (await entityResolver.get(schema, response.data)) as DataModel<unknown>;
  }

  async getRouterPathData({ url, entityBundle, language, cacheHeadersBuilder }: GetRoutePathDataInputModel): Promise<CMSSerializableContentModel> {
    const contentType = new CMSContentTypeDTO(entityBundle).toDomain();
    const schema = contentType && entityBundleSchemaMap[contentType];
    if (!schema)
      throw new AppError({
        code: AppErrorCodes.schemaTypeNotFound,
        message: "Schema not found for entity type: " + entityBundle
      });
    return new CMSSerializableContentModel({
      serializableContent: await this.getCMSContentWithSchema(url, schema, language, cacheHeadersBuilder),
      contentType: new CMSContentTypeDTO(entityBundle).toDomain()
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private checkLanguage(response: any, language: Languages) {
    const responseLangcode = response.data.langcode;
    if (!responseLangcode) return;
    const langcode = language.split("-")[0];
    if (responseLangcode !== langcode && responseLangcode !== language) {
      const dataType = response.data.type;
      if (dataType === "node--simple_page" || dataType === "node--railway_station") {
        throw new AxiosError("Page does not exist in the requested language", "404");
      }
    }
  }
}
