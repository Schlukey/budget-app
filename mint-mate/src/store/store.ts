import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { incomeSlice } from './slices/income.slice';
import { expenseSlice } from './slices/expense.slice';
import { budgetSlice } from './slices/budget.slice';

const incomeSlicePersistReducer = persistReducer(
  {
    key: 'income',
    storage,
  },
  incomeSlice.reducer
);

const expenseSlicePersistedReducer = persistReducer(
  {
    key: 'expense',
    storage,
  },
  expenseSlice.reducer
);

const budgetSlicePersistedReducer = persistReducer(
  {
    key: 'budget',
    storage,
  },
  budgetSlice.reducer
);

export const store = configureStore({
  reducer: {
    income: incomeSlicePersistReducer,
    expense: expenseSlicePersistedReducer,
    budget: budgetSlicePersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const persistor = persistStore(store);
