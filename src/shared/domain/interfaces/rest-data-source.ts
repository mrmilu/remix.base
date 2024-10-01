import type { AxiosHeaders } from "axios";

export interface RestDataSourceOptions {
  params?: Record<string, unknown>;
  headers?: AxiosHeaders;
}

export interface RestDataSourceOptionsWithData<D = unknown> {
  data?: D;
}

export interface IRestDataSource {
  get<T>(url: string, options?: RestDataSourceOptions): Promise<T>;
  post<T, D>(url: string, options?: RestDataSourceOptionsWithData<D>): Promise<T>;
}
