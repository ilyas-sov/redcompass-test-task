export interface User {
  id: string;
  name: string;
}

export interface Transaction {
  sourceId: string;
  targetId: string;
  amount: number;
}

export enum TABS {
  ALL = "ALL",
  INCOMES = "INCOMES",
  OUTCOMES = "OUTCOMES",
}
