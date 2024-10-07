import type { ConstructorType } from "@/src/shared/domain/types/constructor-type";

export enum AppErrorCodes {
  schemaTypeNotFound
}

export class AppError<D extends object = never> extends Error {
  data?: D;
  code: AppErrorCodes;

  constructor(params: Omit<ConstructorType<AppError>, "name">) {
    super(params.message);
    this.data = params.data;
    this.code = params.code;
  }
}
