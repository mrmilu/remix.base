import type { AxiosResponse } from "axios";
import type { ServerResponse } from "http";

export class CacheHeadersBuilder {
  private readonly cacheTags = new Set<string>(["nextjs"]);
  private cacheControl = "";

  addHeaders(axiosResponse: AxiosResponse) {
    const cacheControl = axiosResponse.headers["cache-control"];
    if (!this.cacheControl && cacheControl && typeof cacheControl === "string") {
      this.cacheControl = cacheControl;
    }
    const cacheTags = axiosResponse.headers["cache-tags"];
    if (cacheTags && typeof cacheTags === "string") {
      const splitCacheTags = cacheTags.split(" ");
      for (const tag of splitCacheTags) {
        this.cacheTags.add(tag);
      }
    }
  }

  setHeaders(serverResponse: ServerResponse) {
    serverResponse.setHeader("cache-control", this.cacheControl);
    serverResponse.setHeader("cache-tags", Array.from(this.cacheTags).join(" "));
  }

  getHeaders() {
    return {
      "cache-control": this.cacheControl,
      "cache-tags": Array.from(this.cacheTags).join(" ")
    };
  }
}
