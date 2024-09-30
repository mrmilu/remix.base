export interface RestDataSourceOptions {
  params?: Record<string, unknown>;
}

export interface RestDataSourceOptionsWithData<D = unknown> {
  data?: D;
}

export interface IRestDataSource {
  get<T>(url: string, options?: RestDataSourceOptions): Promise<T>;
  post<T, D>(url: string, options?: RestDataSourceOptionsWithData<D>): Promise<T>;
}
