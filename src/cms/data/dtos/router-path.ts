import { Type } from "class-transformer";

import { CMSRouterJSONApi, CMSRouterPath, CMSRouterEntity } from "@/src/cms/domain/models/cms-router-path";
import { ExposeAll } from "@schema-data-loader/core/decorators";
import type { DataModel } from "@/src/shared/data/models/data-model";

@ExposeAll()
export class CMSRouterEntityDataModel implements DataModel<CMSRouterEntity> {
  canonical = "";
  type = "";
  bundle = "";
  id = "";
  uuid = "";

  toDomain(): CMSRouterEntity {
    return new CMSRouterEntity({
      canonical: this.canonical,
      type: this.type,
      bundle: this.bundle,
      id: this.id,
      uuid: this.uuid
    });
  }
}

@ExposeAll()
export class CMSRouterJSONApiDataModel implements DataModel<CMSRouterJSONApi> {
  individual = "";
  resourceName = "";
  pathPrefix = "";
  basePath = "";
  entryPoint = "";

  toDomain(): CMSRouterJSONApi {
    return new CMSRouterJSONApi({
      individual: this.individual,
      resourceName: this.resourceName,
      pathPrefix: this.pathPrefix,
      basePath: this.basePath,
      entryPoint: this.entryPoint
    });
  }
}

@ExposeAll()
export class CMSRouterPathDataModel implements DataModel<CMSRouterPath> {
  resolved = "";
  isHomePath = false;
  @Type(() => CMSRouterEntityDataModel)
  entity = new CMSRouterEntityDataModel();
  label = "";
  @Type(() => CMSRouterJSONApiDataModel)
  jsonapi = new CMSRouterJSONApiDataModel();

  toDomain(): CMSRouterPath {
    return new CMSRouterPath({
      resolved: this.resolved,
      isHomePath: this.isHomePath,
      entity: this.entity.toDomain(),
      label: this.label,
      jsonapi: this.jsonapi.toDomain()
    });
  }
}
