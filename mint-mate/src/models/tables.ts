import { Base } from './base';

export interface ColumnDefinition {
  header: string;
}

export interface BudgetItem extends Base {
  date?: Date | string;
  title: string;
  description?: string;
  value: number;
}

