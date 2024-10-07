import { AxiosError } from "axios";

export function isNotFoundAxiosError(error: unknown): boolean {
  return error instanceof AxiosError && (error.code === "404" || error.response?.status === 404);
}
