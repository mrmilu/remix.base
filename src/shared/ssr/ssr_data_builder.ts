import type { SsrData, SsrErrors } from "./ssr_data";
import type { LogAndSaveError, SsrDataFactory } from "./ssr_data_factory";
import { err, ok } from "neverthrow";
import { BaseError, ErrorCode } from "../domain/models/base-error-proposal";
import { logError } from "../data/services/logger";

export class SsrDataBuilder {
  ssrData: SsrData = {};
  ssrSerializedData: SsrData = {};
  ssrErrors: SsrErrors = {};

  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private readonly factories: Array<SsrDataFactory<any>>
  ) {}

  async createData() {
    const logAndSaveError: LogAndSaveError = (key, error) => {
      this.ssrErrors[key] = error;
    };
    await Promise.all(
      this.factories.map(async (factory) => {
        this.ssrData[factory.key] = await factory.create(logAndSaveError);
      })
    );
  }

  serializeData() {
    for (const [key, value] of Object.entries(this.ssrData)) {
      this.getFactory(key)
        .map((factory) => {
          this.ssrSerializedData[key] = factory.serialize(value);
        })
        .mapErr(logError);
    }
  }

  deserializeData(serializedData: SsrData) {
    this.ssrSerializedData = serializedData;

    for (const [key, value] of Object.entries(serializedData)) {
      this.getFactory(key)
        .map((factory) => {
          this.ssrData[key] = factory.deserialize(value);
        })
        .mapErr(logError);
    }
  }

  private getFactory(key: string) {
    const factory = this.factories.find((factory) => factory.key === key);

    if (!factory) {
      return err(
        new BaseError({
          code: ErrorCode.NOT_FOUND_ERROR,
          details: [{ type: "ErrorInfo", domain: "domain", metadata: { factories: this.factories, key: key } }],
          message: `SSRDataFactory with key ${key} not found`,
          origin: "SsrDataBuilder",
          recoverable: true,
          avoidable: false
        })
      );
    }
    return ok(factory);
  }
}
