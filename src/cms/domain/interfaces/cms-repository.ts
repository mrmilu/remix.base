import type { CreateContactFormInputModel } from "@/src/cms/domain/models/create-contact-form-input-model";
import type { Languages } from "@/src/shared/presentation/i18n";
import type { CMSRouterPath } from "../models/cms-router-path";
import type { GetRoutePathDataInputModel } from "../models/get-route-path-data-model";
import type { CMSSerializableContentModel } from "../models/cms-content-model";

export interface ICMSRepository {
  postContactForm(input: CreateContactFormInputModel): Promise<void>;
  routerTranslatePath(path: string, language: Languages): Promise<CMSRouterPath>;
  getRouterPathData(input: GetRoutePathDataInputModel): Promise<CMSSerializableContentModel>;
}
