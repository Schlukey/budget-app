import { Base } from './base';

export interface BudgetGoals {
  savings?: Saving;
  cardInstallments?: string;
}

export interface Saving {
  name: string;
  value?: string;
}

export interface Budget extends Base {
  title: string;
  goals?: BudgetGoals;
  incomes: BudgetItem[];
  expenses: BudgetItem[];
  value: number;
}
export interface BudgetItem extends Base {
  date?: Date | string;
  title: string;
  description?: string;
  value: number;
}

export interface Presets {
  name: string;
  value: number;
}
