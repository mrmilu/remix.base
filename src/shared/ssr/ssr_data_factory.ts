export type LogAndSaveError = (key: string, error?: unknown) => void;
export interface SsrDataFactory<T> {
  /**
   * Unique identifier for the data
   */
  key: string;
  /**
   * Creates the SSR data by fetching it from an external source.
   * @param logAndSaveError - Logs and saves the error in the SSR errors object.
   */
  create: (logAndSaveError: LogAndSaveError) => Promise<T>;
  /**
   * Transforms the data into a JSON object so that it can be transferred to the
   * client via SSR.
   */
  serialize: (data: T) => unknown;
  /**
   * Transforms the serialized data into a domain model.
   */
  deserialize: (serializedData: unknown) => T;
}
