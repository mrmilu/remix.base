import { inject, injectable } from "inversify";
import { type PostRequestOptions, RestClient } from "@/src/shared/data/services/rest-client";
import { TYPES } from "@/ioc/__generated__/types";
import type { IEnvVars } from "@/src/shared/domain/interfaces/env-vars";
import type { IRestDataSource, RestDataSourceOptions } from "@/src/shared/domain/interfaces/rest-data-source";
import { generatorConf } from "inversify-generator/decorators";
import { logError } from "@/src/shared/data/services/logger";

@injectable()
@generatorConf({ typeName: "CMSService" })
export class CMSService implements IRestDataSource {
  private readonly httpClient: RestClient;

  constructor(@inject(TYPES.IEnvVars) envVars: IEnvVars) {
    this.httpClient = new RestClient(`${envVars.cmsApiUrl}`);
  }

  async get<T = unknown>(url: string, { params, headers }: RestDataSourceOptions = {}): Promise<T> {
    const result = await this.httpClient.get<T>(url, {
      params,
      headers
    });

    if (result.isErr()) {
      logError(result.error);

      throw result.error;
    }

    return result.value.data;
  }

  async post<T, D>(url: string, options?: PostRequestOptions<D>): Promise<T> {
    const result = await this.httpClient.post<T, D>(url, options);

    if (result.isErr()) {
      logError(result.error);

      throw result.error;
    }

    return result.value.data;
  }
}
