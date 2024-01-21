import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Budget } from '../../models/budget';
import { RootState } from '../store';

export interface BudgetState {
  budgets: Budget[];
  budget?: Budget;
}

const initialState: BudgetState = {
  budgets: [],
  budget: undefined,
};

export const budgetSlice = createSlice({
  name: 'budget-slice',
  initialState,
  reducers: {
    createBudget: (state, action: PayloadAction<Budget>) => {
      return {
        ...state,
        budgets: [...state.budgets, action.payload],
      };
    },
    setSelectedBudget: (state, action: PayloadAction<Budget>) => {
      return {
        ...state,
        budget: action.payload,
      };
    },
    removeBudget: (state, action: PayloadAction<Budget>) => {
      const currentBudgets = state.budgets.filter((budget) => {
        return budget.id !== action.payload.id;
      });
      return {
        ...state,
        budgets: currentBudgets,
      };
    },
  },
});

export const { createBudget, setSelectedBudget, removeBudget } =
  budgetSlice.actions;

export const selectBudgets = (state: RootState) => state.budget.budgets;
export const selectBudget = (state: RootState) => state.budget.budget;
