import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BudgetItem } from '../../models/tables';

export interface IncomeState {
  incomes: BudgetItem[];
  totalIncomeValue: number;
}

const initialState: IncomeState = {
  incomes: [],
  totalIncomeValue: 0,
};

export const incomeSlice = createSlice({
  name: 'income-counter',
  initialState,
  reducers: {
    addIcomeSource: (state, action: PayloadAction<BudgetItem>) => {
      return {
        ...state,
        incomes: [...state.incomes, action.payload],
      };
    },
    removeIncomeSource: (state, action: PayloadAction<BudgetItem>) => {
      const copyIncomes: BudgetItem[] = state.incomes.filter((income) => {
        return income.id !== action.payload.id;
      });
      return {
        ...state,
        incomes: copyIncomes,
      };
    },
    setIncome: (state, action: PayloadAction<BudgetItem[]>) => {
      return {
        ...state,
        incomes: action.payload,
      };
    },
    resetIcome: (state) => {
      return {
        ...state,
        incomes: [],
      };
    },
    setTotalIncomeValue: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        totalIncomeValue: action.payload,
      };
    },
  },
});

export const { addIcomeSource, removeIncomeSource, setIncome, resetIcome } =
  incomeSlice.actions;

// export const selectTotalValue = (state: RootState) => state.
