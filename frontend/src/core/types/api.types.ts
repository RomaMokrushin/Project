export type AVAILABLE_APIS = 'local' | 'stage' | 'preprod' | 'prod' | 'revapp';

export type DefaultPageProps = {
  searchParams?: {
    // Don't put not generic search params to this generic type! Only property ALL PAGES need.
    api?: AVAILABLE_APIS;
    msApi?: AVAILABLE_APIS;
    channel?: string;
    /**
     * Display price true/false.
     */
    sp?: string;
  };
};

export type ApiError = {
  type: string;
  title: string;
  detail: string;
  trace: string;
};

export type FetchResponse<T> = {
  data: T;
  meta?: {
    totalItems?: number;
    itemsPerPage?: number;
    currentPage?: number;
  };
};
