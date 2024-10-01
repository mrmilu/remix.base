import type { ConstructorType } from "@/src/shared/domain/types/constructor-type";

export class CMSRouterPath {
  resolved: string;
  isHomePath: boolean;
  entity: CMSRouterEntity;
  label: string;
  jsonapi: CMSRouterJSONApi;

  constructor(params: ConstructorType<CMSRouterPath>) {
    this.resolved = params.resolved;
    this.isHomePath = params.isHomePath;
    this.entity = params.entity;
    this.label = params.label;
    this.jsonapi = params.jsonapi;
  }
}

export class CMSRouterEntity {
  canonical: string;
  type: string;
  bundle: string;
  id: string;
  uuid: string;

  constructor(params: ConstructorType<CMSRouterEntity>) {
    this.canonical = params.canonical;
    this.type = params.type;
    this.bundle = params.bundle;
    this.id = params.id;
    this.uuid = params.uuid;
  }
}

export class CMSRouterJSONApi {
  individual: string;
  resourceName: string;
  pathPrefix: string;
  basePath: string;
  entryPoint: string;

  constructor(params: ConstructorType<CMSRouterJSONApi>) {
    this.individual = params.individual;
    this.resourceName = params.resourceName;
    this.pathPrefix = params.pathPrefix;
    this.basePath = params.basePath;
    this.entryPoint = params.entryPoint;
  }
}
