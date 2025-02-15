import { FinancialSummary } from "@/core/types";
import { DataElement, StyledDataBlockWrapper } from "./dataBlock.styles";

type Props = Omit<
  FinancialSummary,
  "expenses_by_month" | "recent_trips" | "my_debts" | "my_lends"
>;
export default function DataBlock(props: Props) {
  return (
    <StyledDataBlockWrapper>
      <DataElement>
        <span>Всего переведено средств:</span>
        <span>{props.total_funds_transferred.toFixed(2)} ₽</span>
      </DataElement>
      <DataElement>
        <span>Всего взято в долг:</span>
        <span>{props.total_debts.toFixed(2)} ₽</span>
      </DataElement>
      <DataElement>
        <span>Всего отдано в долг:</span>
        <span>{props.total_lends.toFixed(2)} ₽</span>
      </DataElement>
      <DataElement>
        <span>Посещено поездок:</span>
        <span>{props.trips_visited}</span>
      </DataElement>
      <DataElement>
        <span>Посещено событий:</span>
        <span>{props.events_visited}</span>
      </DataElement>
      <DataElement>
        <span>Всего создано групп:</span>
        <span>{props.groups_created}</span>
      </DataElement>
      <DataElement>
        <span>Возраст аккаунта:</span>
        <span>{props.account_age}</span>
      </DataElement>
    </StyledDataBlockWrapper>
  );
}
