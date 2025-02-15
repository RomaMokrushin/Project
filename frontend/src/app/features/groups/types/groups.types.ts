export type GroupsSlug = {
  params: Promise<{
    id: string;
  }>;
};

export type ReportSlug = {
  params: Promise<{
    id: string;
    reportId: string;
  }>;
};
