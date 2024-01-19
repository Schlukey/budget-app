import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BudgetItem } from '../../models/budget';
import { RootState } from '../store';

export interface ExpenseState {
  expenses: BudgetItem[];
  expense: BudgetItem | null;
  totalExpenseValue: number;
}

const initialState: ExpenseState = {
  expenses: [],
  expense: null,
  totalExpenseValue: 0,
};

export const expenseSlice = createSlice({
  name: 'expense-counter',
  initialState,
  reducers: {
    addExpenseSource: (state, action: PayloadAction<BudgetItem>) => {
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    },
    removeExpenseSource: (state, action: PayloadAction<BudgetItem>) => {
      const copyExpenses: BudgetItem[] = state.expenses.filter((expense) => {
        return expense.id !== action.payload.id;
      });
      return {
        ...state,
        expenses: copyExpenses,
      };
    },
    setExpense: (state, action: PayloadAction<BudgetItem[]>) => {
      return {
        ...state,
        expenses: action.payload,
      };
    },
    resetExpense: (state) => {
      return {
        ...state,
        expenses: [],
      };
    },
    setTotalExpenseValue: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        totalExpenseValue: action.payload,
      };
    },
  },
});

export const {
  addExpenseSource,
  removeExpenseSource,
  setExpense,
  setTotalExpenseValue,
  resetExpense,
} = expenseSlice.actions;

export const selectTotalExpense = (state: RootState) =>
  state.expense.totalExpenseValue;
export const selectExpense = (state: RootState) => state.expense.expense;
export const selectExpenses = (state: RootState) => state.expense.expenses;
