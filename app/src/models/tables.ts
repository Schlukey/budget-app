import { Base } from './base';

export enum ColumnTypes {
  Income,
  Expense,
}

export interface ColumnDefinition {
  columnType: ColumnTypes;
  header: string;
}

export interface TableData {
  date?: Date | string;
  title: string;
  description?: string;
  value: number;
}
