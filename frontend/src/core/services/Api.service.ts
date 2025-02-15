import ErrorHelper from "../helpers/ErrorHelper";
// import { getContextParams } from "../utils/cache.utils";

class ApiService {
  static baseUrl = `${process.env.BACKEND_URL}/api`;

  static getBaseUrl() {
    return this.baseUrl;
  }

  static async fetch<T>(
    input: string | URL | Request,
    init?: RequestInit | undefined,
    /**
     * Skipping header for first API call (such as Channel etc)
     * Otherwise -> infinite loop.
     */
    skipDefaultHeaders = false,
    getFullResponse = false
  ): Promise<{ data: T | undefined; error: Error | undefined }> {
    // const cache = getContextParams();

    const defaultHeaders: HeadersInit = skipDefaultHeaders
      ? {}
      : ({
          // static from cache
        } satisfies HeadersInit);

    const baseUrl = this.getBaseUrl();

    return fetch(`${baseUrl}${input}`, {
      ...init,
      headers: {
        ...init?.headers,
        ...defaultHeaders,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(ErrorHelper.buildErrorMessage(response));
        }

        return response.json();
      })
      .then((response) => {
        if (getFullResponse) {
          return { data: response as T, error: undefined };
        }

        return { data: response.data || (response as T), error: undefined };
      })
      .catch((errorFetch) => {
        console.error(errorFetch);
        return { data: undefined, error: errorFetch };
      });
  }
}

export default ApiService;
