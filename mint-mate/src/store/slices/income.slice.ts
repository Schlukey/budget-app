import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BudgetItem } from '../../models/budget';
import { RootState } from '../store';

export interface IncomeState {
  incomes: BudgetItem[];
  totalIncomeValue: number;
  salary: number;
}

const initialState: IncomeState = {
  incomes: [],
  totalIncomeValue: 0,
  salary: 0,
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
    setSalary: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        salary: action.payload,
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
      let sum = 0;
      state.incomes.forEach((x) => {
        sum += x.value;
      });
      return {
        ...state,
        totalIncomeValue: sum,
      };
    },
  },
});

export const {
  addIcomeSource,
  removeIncomeSource,
  setIncome,
  resetIcome,
  setTotalIncomeValue,
  setSalary,
} = incomeSlice.actions;

export const selectIncomes = (state: RootState) => state.income.incomes;
export const selectTotalIncome = (state: RootState) =>
  state.income.totalIncomeValue;
export const selectSalary = (state: RootState) => state.income.salary;
