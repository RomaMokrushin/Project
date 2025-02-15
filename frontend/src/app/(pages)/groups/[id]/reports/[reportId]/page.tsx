import ReportByIdPageWrapper from "@/app/features/groups/byId/components/reportById/pageWrapper";
import type { ReportSlug } from "@/app/features/groups/types/groups.types";
import { Container } from "@/core/styles/global-styles.styles";

export default async function ReportByIdPage({ params }: ReportSlug) {
  const { reportId, id } = await params;
  return (
    <Container>
      <ReportByIdPageWrapper groupId={id} reportId={reportId} />
    </Container>
  );
}
