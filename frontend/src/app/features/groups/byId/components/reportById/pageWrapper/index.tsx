import GroupsService from "@/core/services/Groups.service";
import {
  GoBackButton,
  StyledReportByIdPageWrapper,
} from "../../../styles/reportById.styles";
import ReportHeader from "../header";
import ReportEvents from "../events";
import ReportTotalByPerson from "../totalByPerson";
import ReportSummary from "../summary";
import { IconHandler } from "@/core/images/IconHandler";
import { Icon } from "@/core/enums/Icon.enum";

type Props = {
  groupId: string;
  reportId: string;
};

export default async function ReportByIdPageWrapper({
  groupId,
  reportId,
}: Props) {
  const { data: report, error: reportError } =
    await GroupsService.getReportById(reportId);
  if (!report || reportError) {
    console.log("error", reportError);
    return null;
  }
  return (
    <StyledReportByIdPageWrapper>
      <GoBackButton href={`/groups/${groupId}`}>
        {IconHandler(Icon.ArrowLeft)}
        Назад к группе
      </GoBackButton>
      <ReportHeader report={report} />
      <ReportEvents report={report} />
      <ReportTotalByPerson report={report} />
      <ReportSummary report={report} />
    </StyledReportByIdPageWrapper>
  );
}
