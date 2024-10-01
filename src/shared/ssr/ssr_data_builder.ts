import { logError } from "@/src/shared/presentation/utils/log-error";
import type { SsrData, SsrErrors } from "./ssr_data";
import type { LogAndSaveError, SsrDataFactory } from "./ssr_data_factory";

export class SsrDataBuilder {
  ssrData: SsrData = {};
  ssrSerializedData: SsrData = {};
  ssrErrors: SsrErrors = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private readonly factories: Array<SsrDataFactory<any>>) {}

  async createData() {
    const logAndSaveError: LogAndSaveError = (key, error) => {
      logError(error);
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
      const factory = this.getFactory(key);
      this.ssrSerializedData[key] = factory.serialize(value);
    }
  }

  deserializeData(serializedData: SsrData) {
    this.ssrSerializedData = serializedData;
    for (const [key, value] of Object.entries(serializedData)) {
      const factory = this.getFactory(key);
      this.ssrData[key] = factory.deserialize(value);
    }
  }

  private getFactory(key: string): SsrDataFactory<unknown> {
    const factory = this.factories.find((factory) => factory.key === key);
    if (!factory) {
      throw new Error(`SSRDataFactory with key ${key} not found`);
    }
    return factory;
  }
}
