import type { AxiosHeaders, AxiosInstance} from "axios";
import { AxiosError } from "axios";
import axios from "axios";
import { ResultAsync } from "neverthrow";
import { HttpError, HttpStatusCode } from "../../domain/models/http-error";
import { ErrorCode } from "../../domain/models/base-error-proposal";

export interface GetRequestOptions {
  params?: Record<string, unknown>;
  headers?: AxiosHeaders;
  paramsSerializer?: {
    encode: (params: Record<string, unknown>) => string;
  };
}

export interface PostRequestOptions<D = Record<string, unknown>> {
  data?: D;
}

export type PutRequestOptions<D> = PostRequestOptions<D>;
export type PatchRequestOptions<D> = PostRequestOptions<D>;
export type DeleteRequestOptions = GetRequestOptions;

const parseNetworkError = (error: unknown) => {
  if (error instanceof AxiosError) {
    const axiosError = error as AxiosError;

    const statusCode = axiosError.response?.status || HttpStatusCode.INTERNAL_SERVER_ERROR;

    const httpError = new HttpError({
      message: axiosError.message || "An error occurred while making the request",
      statusCode: statusCode,
      url: axiosError.config?.url || "Unknown URL",
      responseData: axiosError.response?.data || null,
      code: ErrorCode.NETWORK_ERROR, // Map the status code to your Code enum
      details: [
        {
          type: "HTTP",
          domain: axiosError.config?.url || "Unknown domain",
          metadata: {
            method: axiosError.config?.method,
            headers: axiosError.config?.headers,
            responseHeaders: axiosError.response?.headers,
            requestData: axiosError.config?.data
          }
        }
      ],
      recoverable: statusCode >= 500 && statusCode < 600, // TODO: improve this example to make it more realistic.Example: server errors are potentially recoverable
      avoidable: statusCode === HttpStatusCode.BAD_REQUEST || statusCode === HttpStatusCode.UNAUTHORIZED, // TODO: improve this example to make it more realistic. Example: client-side errors may be avoidable
      origin: "network"
    });

    return httpError;
  }

  return new HttpError({
    message: "An unknown error occurred",
    statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    url: "Unknown URL",
    code: ErrorCode.NETWORK_ERROR,
    details: [
      {
        type: "Unknown",
        domain: "Unknown",
        metadata: {}
      }
    ],
    recoverable: false,
    avoidable: false,
    origin: "network"
  });
};

export class RestClient {
  private client: AxiosInstance;

  constructor(baseUrl: string) {
    this.client = axios.create({
      baseURL: baseUrl,
      timeout: 5000
    });
  }

  get<T>(url: string, options?: GetRequestOptions) {
    return ResultAsync.fromPromise(this.client.get<T>(url, options), parseNetworkError);
  }

  delete<T>(url: string, options?: DeleteRequestOptions) {
    return ResultAsync.fromPromise(this.client.delete<T>(url, options), parseNetworkError);
  }

  post<T, D>(url: string, options?: PostRequestOptions<D>) {
    return ResultAsync.fromPromise(this.client.post<T>(url, options?.data), parseNetworkError);
  }

  put<T, D>(url: string, options?: PutRequestOptions<D>) {
    return ResultAsync.fromPromise(this.client.put<T>(url, options?.data), parseNetworkError);
  }

  patch<T, D>(url: string, options?: PatchRequestOptions<D>) {
    return ResultAsync.fromPromise(this.client.patch<T>(url, options?.data), parseNetworkError);
  }
}
