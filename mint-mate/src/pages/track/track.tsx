import BaseLayout from '../../components/layouts/base-layout';
import { Flex } from '@chakra-ui/layout';
import AppText from '../../components/app/app-text/app-text';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeBudget,
  selectBudgets,
  setSelectedBudget,
} from '../../store/slices/budget.slice';
import AppBudgetCard from '../../components/app/app-budget-card/app-budget-card';
import { useEffect } from 'react';
import { Budget } from '../../models/budget';
import { useNavigate } from 'react-router-dom';
import { RoutesList } from '../../router/router';
import { resetExpense } from '../../store/slices/expense.slice';
import { resetIcome } from '../../store/slices/income.slice';

const Track: React.FC = () => {
  const budgets = useSelector(selectBudgets);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBudgetSelect = (item: Budget) => {
    dispatch(setSelectedBudget(item));
    navigate(RoutesList.Budget);
  };

  const handleBudgetDelete = (item: Budget) => {
    dispatch(removeBudget(item));
  };

  useEffect(() => {
    dispatch(resetExpense());
    dispatch(resetIcome());
  }, []);

  return (
    <BaseLayout>
      <Flex direction={'column'} w={'full'} gap={3} p={4}>
        {budgets.map((budget) => {
          return (
            <AppBudgetCard
              key={budget.id}
              budget={budget}
              onBudgetClick={() => {
                handleBudgetSelect(budget);
              }}
              onBudgetDelete={() => {
                handleBudgetDelete(budget);
              }}
            />
          );
        })}
      </Flex>
    </BaseLayout>
  );
};

export default Track;
