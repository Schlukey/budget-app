import React, { useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import BaseLayout from '../../components/layouts/base-layout';
import AppButton from '../../components/app/app-button/app-button';
import AppText from '../../components/app/app-text/app-text';
import { AppColors } from '../../theme';
import { BudgetItem } from '../../models/tables';
import AppInput from '../../components/app/app-input/app-input';
import AppTable from '../../components/app/app-budget-table/app-table';
import { incomeColumns } from '../../components/table-columns/columns';

const Create: React.FC = () => {
  const [currentIcomes, setCurrentIncomes] = useState<BudgetItem[]>([]);
  const [name, setName] = useState<string>('');
  const [itemValue, setItemValue] = useState<number>(0);
  const [currentExpenses, setCurrentExpenses] = useState<BudgetItem[]>([]);
  const incomes: BudgetItem[] = [];
  const expenses: BudgetItem[] = [];

  const handleIncomeAdd = (name: string, value: number) => {
    const newIncome: BudgetItem = {
      title: name ?? 'check name',
      value: itemValue ?? 0,
    };
    console.log('test item', newIncome);
    // incomes.push(newIncome);
    // setCurrentIncomes(incomes);
  };

  useEffect(() => {
    setCurrentIncomes(incomes);
    setCurrentExpenses(expenses);
  }, []);

  return (
    <BaseLayout add={false}>
      <Flex w={'full'} p={4} gap={4}>
        <Flex
          w={'full'}
          direction={'column'}
          align={'start'}
          justify={'center'}
          gap={4}
          p={6}
        >
          <AppText fontWeight={'600'} fontSize={'x-large'}>
            Title
          </AppText>
          <Flex direction={'column'} gap={4} w={'full'} minH={'450px'}>
            <Flex w={'full'} gap={3} align={'end'}>
              <AppInput
                id='income-name'
                label='Name'
                name='source'
                inputType='text'
                value={'name'}
                placeholder='Name'
                onChange={(e) => {
                  // e.preventDefault();
                  setName(e.target.value);
                  console.log(name);
                }}
              />
              <AppInput
                id='income-value'
                label='Value'
                value={'itemValue'}
                name='source'
                inputType='number'
                placeholder='0'
                onChange={(e) => {
                  setItemValue(+e.target.value);
                }}
              />
              <AppButton
                color={AppColors.highlight}
                onClick={() => handleIncomeAdd(name, itemValue)}
              >
                +
              </AppButton>
            </Flex>
            <AppTable columns={incomeColumns} data={currentIcomes || []} />
          </Flex>

          <Flex direction={'column'} gap={4} w={'full'} minH={'450px'}>
            <Flex w={'full'} gap={3} align={'end'}>
              <AppInput
                id='income-name'
                label='Name'
                name='source'
                inputType='text'
                placeholder='Name'
              />
              <AppInput
                id='income-value'
                label='Value'
                name='source'
                inputType='text'
                placeholder='0'
              />
              <AppButton color={AppColors.highlight}>+</AppButton>
            </Flex>
            <AppTable columns={incomeColumns} data={currentIcomes || []} />
          </Flex>
        </Flex>
        <Flex w={'full'}>
          <AppText>Graphs and stuff go here</AppText>
        </Flex>
      </Flex>
    </BaseLayout>
  );
};

export default Create;
