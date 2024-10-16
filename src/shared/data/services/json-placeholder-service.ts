import type { IEnvVars } from "@/src/shared/domain/interfaces/env-vars";
import type { IRestDataSource, RestDataSourceOptions, RestDataSourceOptionsWithData } from "@/src/shared/domain/interfaces/rest-data-source";
import { TYPES } from "@/src/shared/ioc/__generated__/types";
import { RestClient } from "@/src/shared/data/services/rest-client";
import { inject, injectable } from "inversify";
import { generatorConf } from "inversify-generator/decorators";
import type { ILogger } from "../../domain/interfaces/logger";

@injectable()
@generatorConf({ typeName: "JSONPlaceholderService" })
export class JSONPlaceholderService implements IRestDataSource {
  private readonly jsonPlaceholderClient: RestClient;

  constructor(
    @inject(TYPES.IEnvVars) envVars: IEnvVars,
    @inject(TYPES.ILogger) private readonly logger: ILogger
  ) {
    this.jsonPlaceholderClient = new RestClient(envVars.serverUrl);
  }

  async get<T = unknown>(url: string, { params }: RestDataSourceOptions = {}) {
    const result = await this.jsonPlaceholderClient.get<T>(url, {
      params
    });

    if (result.isErr()) {
      this.logger.logError(result.error);

      throw result.error;
    }

    return result.value.data;
  }

  async post<T = unknown, D = unknown>(url: string, options: RestDataSourceOptionsWithData<D> = {}) {
    const result = await this.jsonPlaceholderClient.post<T, D>(url, options);

    if (result.isErr()) {
      this.logger.logError(result.error);

      throw result.error;
    }

    return result.value.data;
  }
}
