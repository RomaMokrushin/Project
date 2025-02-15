import NavBarServer from "@/app/features/common/navBar/navBarServer";
import {
  DataBlockWrapper,
  MainDataWrapper,
  StyledStatisticsWrapper,
} from "../../styles/statistics.styles";
import StatisticsService from "@/core/services/Statistics.service";
import BarChartTrips from "../barCharTrips/barChart";
import BarChartExpenses from "../barCharExpenses/barChart";
import PieChart from "../pieChar/pieChart";
import DataBlock from "../dataBlock/dataBlock";

export default async function StatisticsServer() {
  const { data, error } = await StatisticsService.getMyStatistics();
  if (!data || error) {
    console.log("error", error);
    return null;
  }
  console.log("data", data);
  const { expenses_by_month, recent_trips, my_debts, my_lends, ...restData } =
    data;
  const totalDebtors = Object.values(data.my_debts).reduce(
    (acc, value) => acc + value,
    0
  );

  // Calculate the total for lends
  const totalLenders = Object.values(data.my_lends).reduce(
    (acc, value) => acc + value,
    0
  );

  return (
    <StyledStatisticsWrapper>
      <NavBarServer />
      <MainDataWrapper>
        <DataBlockWrapper>
          <BarChartExpenses statistics={expenses_by_month} />
        </DataBlockWrapper>
        <DataBlockWrapper>
          <BarChartTrips statistics={recent_trips} />
        </DataBlockWrapper>
        <DataBlockWrapper>
          <PieChart
            statistics={my_debts}
            title="Мои кредиторы"
            total={totalDebtors}
          />
        </DataBlockWrapper>
        <DataBlockWrapper>
          <PieChart
            statistics={my_lends}
            title="Мои должники"
            total={totalLenders}
          />
        </DataBlockWrapper>
      </MainDataWrapper>
      <DataBlock {...restData} />
    </StyledStatisticsWrapper>
  );
}
