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
  totalValue: number;
}
