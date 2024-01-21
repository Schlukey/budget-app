import React, { useState, useEffect } from 'react';
import BaseLayout from '../../components/layouts/base-layout';
import { Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectBudget } from '../../store/slices/budget.slice';
import AppText from '../../components/app/app-text/app-text';
import { AppColors } from '../../theme';
import AppTable from '../../components/app/app-budget-table/app-table';
import { budgetColumns } from '../../components/table-columns/columns';

const Budget: React.FC = () => {
  const budget = useSelector(selectBudget);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);

  useEffect(() => {
    let incomeTotal = 0;
    budget?.incomes.forEach((x) => (incomeTotal += x.value));
    setTotalIncome(incomeTotal);
    let expenseTotal = 0;
    budget?.expenses.forEach((x) => (expenseTotal += x.value));
    setTotalExpense(expenseTotal);
  }, []);

  return (
    <BaseLayout>
      <Flex direction={'column'} gap={3} w={'full'} p={8}>
        <AppText
          fontSize={'x-large'}
          fontWeight={'600'}
          color={AppColors.highlight}
        >
          {budget?.title}
        </AppText>
        <Flex gap={3} p={4} justify={'space-between'}>
          <Flex direction={'column'} gap={3}>
            <AppText fontWeight={'bold'} color={AppColors.highlight}>
              Incomes
            </AppText>
            <AppTable
              columns={budgetColumns}
              data={budget?.incomes || []}
              removeItem={() => {}}
              total={totalIncome}
              remove={false}
            />
          </Flex>
          <Flex direction={'column'} gap={3}>
            <AppText fontWeight={'bold'} color={AppColors.highlight}>
              Expenses
            </AppText>
            <AppTable
              columns={budgetColumns}
              data={budget?.expenses || []}
              removeItem={() => {}}
              total={totalExpense}
              remove={false}
            />
          </Flex>
        </Flex>
      </Flex>
    </BaseLayout>
  );
};

export default Budget;
