export type FinancialSummary = {
  expenses_by_month: {
    [month: string]: number;
  };
  recent_trips: {
    [month: string]: number;
  };
  my_debts: {
    [person: string]: number;
  };
  my_lends: {
    [person: string]: number;
  };
  total_debts: number;
  total_lends: number;
  total_funds_transferred: number;
  total_borrowed: number;
  total_lent: number;
  trips_visited: number;
  events_visited: number;
  groups_created: number;
  account_age: string;
};
