import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { DefaultPageProps } from "../types/api.types";

export type CacheType = DefaultPageProps["searchParams"] & {
  isSignedIn?: boolean;
  host?: string;
};

let contextParams: CacheType = { isSignedIn: false };

export async function initContextParams(
  props: DefaultPageProps,
  headers: ReadonlyHeaders
) {
  const host = headers.get("host") || undefined;

  contextParams = {
    isSignedIn: false,
    host,
    ...props.searchParams,
  };

  return contextParams;
}

export function getContextParams() {
  return contextParams;
}
