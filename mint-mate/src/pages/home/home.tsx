import React, { useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import BaseLayout from '../../components/layouts/base-layout';
import { useSelector } from 'react-redux';
import { selectBudgets } from '../../store/slices/budget.slice';
import { AppColors } from '../../theme';
import AppText from '../../components/app/app-text/app-text';
import AppTable from '../../components/app/app-budget-table/app-table';
import { budgetColumns } from '../../components/table-columns/columns';

const Dashboard: React.FC = () => {
  const budgets = useSelector(selectBudgets);
  const [totalSavings, setTotalSavings] = useState<number>(0);

  useEffect(() => {    
    let savingsSum = 0;
    budgets.map((x) => {
      savingsSum += x.value;
    });
    setTotalSavings(savingsSum);
    console.log(totalSavings)
  }, [budgets]);

  return (
    <BaseLayout>
      <Flex p={4} direction={'column'} gap={4} minH={'100vh'}>
        <Flex direction={'row'} w={'full'} gap={3} justify={'end'}>
          <Flex bgColor={AppColors.secondary} borderRadius={0} p={4} gap={12}>
            <AppText fontWeight={'bold'}>Total Budgets stored:</AppText>
            <AppText fontWeight={'bold'} color={AppColors.highlight}>
              {budgets.length}
            </AppText>
          </Flex>
          <Flex bgColor={AppColors.secondary} borderRadius={0} p={4} gap={12}>
            <AppText fontWeight={'bold'}>Total Estimated savings:</AppText>
            <AppText fontWeight={'bold'} color={AppColors.highlight}>
              {totalSavings ?? 0}
            </AppText>
          </Flex>
        </Flex>

        <Flex w={'full'}>
          <AppTable
            data={budgets}
            columns={budgetColumns}
            removeItem={() => {}}
            remove={false}
            total={totalSavings || 0}
          />
        </Flex>
      </Flex>
    </BaseLayout>
  );
};

export default Dashboard;
