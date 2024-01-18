import React, { useState, useEffect } from 'react';
import { Flex, Input } from '@chakra-ui/react';
import BaseLayout from '../../components/layouts/base-layout';
import AppButton from '../../components/app/app-button/app-button';
import AppText from '../../components/app/app-text/app-text';
import { AppColors } from '../../theme';
import { BudgetItem } from '../../models/tables';
import AppTable from '../../components/app/app-budget-table/app-table';
import { incomeColumns } from '../../components/table-columns/columns';
import { useDispatch, useSelector } from 'react-redux';
import {
  addIcomeSource,
  removeIncomeSource,
  selectIncomes,
  selectTotalIncome,
  setTotalIncomeValue,
} from '../../store/slices/income.slice';
import { v4 as uuidv4 } from 'uuid';
import {
  addExpenseSource,
  removeExpenseSource,
  selectExpenses,
  selectTotalExpense,
  setTotalExpenseValue,
} from '../../store/slices/expense.slice';

const Create: React.FC = () => {
  const dispatch = useDispatch();
  const storeIncomes = useSelector(selectIncomes);
  const totalIncomeValue = useSelector(selectTotalIncome);
  const totalExpenseValue = useSelector(selectTotalExpense)
  const storeExpenses = useSelector(selectExpenses);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [incomeName, setIncomeName] = useState<string>('');
  const [incomeValue, setIncomeValue] = useState<number>();

  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [expenseItem, setExpenseItem] = useState<string>('');
  const [expenseValue, setExpenseValue] = useState<number>(0);

  const [leftOver, setLeftOver] = useState<number>(0);

  const handleIncomeAdd = (name: string, value: number | undefined) => {
    const newIncome: BudgetItem = {
      title: name ?? 'check name',
      value: value ?? 0,
      dateCreated: new Date(),
      id: uuidv4(),
    };

    dispatch(addIcomeSource(newIncome));
  };

  const handleExpenseAdd = (name: string, value: number | undefined) => {
    const newExpense: BudgetItem = {
      title: name ?? 'check name',
      value: value ?? 0,
      dateCreated: new Date(),
      id: uuidv4(),
    };
    dispatch(addExpenseSource(newExpense));
  };

  const removeIncomeItem = (item: BudgetItem) => {
    console.log('item', item);
    dispatch(removeIncomeSource(item));
  };

  const removeExpenseItem = (item: BudgetItem) => {
    dispatch(removeExpenseSource(item));
  };

  const getIncomeTotal = () => {
    let sum = 0;
    storeIncomes.forEach((x) => {
      sum += x.value;
    });
    setTotalIncome(sum);
  };

  const getExpenseTotal = () => {
    let sum = 0;
    storeExpenses.forEach((x) => {
      sum += x.value;
    });
    setTotalExpense(sum);
  };

  useEffect(() => {
    getIncomeTotal();
    getExpenseTotal();
    const totalLeftOver = totalIncomeValue - totalExpenseValue;
    setLeftOver(totalLeftOver);
    dispatch(setTotalExpenseValue(totalExpense));
    dispatch(setTotalIncomeValue(totalIncome));
  }, [storeIncomes, storeExpenses]);

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
            New Budget
          </AppText>
          <Flex direction={'column'} gap={4} w={'full'} minH={'450px'}>
            <Flex w={'full'} gap={3} align={'end'}>
              <Input
                border={`1px solid ${AppColors.highlight}`}
                borderRadius={0}
                id='income-name'
                color={'white'}
                name='source'
                type='text'
                value={incomeName}
                placeholder='Name'
                onChange={(e) => {
                  e.preventDefault();
                  setIncomeName(e.target.value);
                }}
              />
              <Input
                border={`1px solid ${AppColors.highlight}`}
                borderRadius={0}
                color={'white'}
                id='income-value'
                value={incomeValue}
                name='source'
                type='number'
                placeholder='0'
                onChange={(e) => {
                  e.preventDefault();
                  setIncomeValue(+e.target.value);
                }}
              />
              <AppButton
                color={AppColors.highlight}
                onClick={() => handleIncomeAdd(incomeName, incomeValue)}
              >
                +
              </AppButton>
            </Flex>
            <Flex overflow={'scroll'} h={'200px'}>
              <AppTable
                total={totalIncome}
                removeItem={(item: BudgetItem) => {
                  removeIncomeItem(item);
                }}
                columns={incomeColumns}
                data={storeIncomes || []}
              />
            </Flex>
          </Flex>

          <Flex direction={'column'} gap={4} w={'full'} minH={'450px'}>
            <Flex w={'full'} gap={3} align={'end'}>
              <Input
                border={`1px solid ${AppColors.highlight}`}
                borderRadius={0}
                color={'white'}
                id='income-name'
                type='text'
                name='source'
                placeholder='Name'
                onChange={(e) => {
                  e.preventDefault();
                  setExpenseItem(e.target.value);
                }}
              />
              <Input
                border={`1px solid ${AppColors.highlight}`}
                borderRadius={0}
                color={'white'}
                id='income-value'
                name='source'
                type='text'
                placeholder='0'
                onChange={(e) => {
                  e.preventDefault();
                  setExpenseValue(+e.target.value);
                }}
              />
              <AppButton
                color={AppColors.highlight}
                onClick={() => handleExpenseAdd(expenseItem, expenseValue)}
              >
                +
              </AppButton>
            </Flex>
            <AppTable
              removeItem={(item: BudgetItem) => removeExpenseItem(item)}
              columns={incomeColumns}
              data={storeExpenses || []}
              total={totalExpense}
            />
          </Flex>
        </Flex>
        <Flex
          w={'full'}
          direction={'column'}
          align={'start'}
          justify={'start'}
          gap={4}
          p={6}
        >
          <AppText fontSize={'x-large'} fontWeight={'600'}>
            Money Left Over:
          </AppText>
          <AppText
            fontWeight={'bold'}
            fontSize={'medium'}
            color={AppColors.highlight}
          >
            R {leftOver}
          </AppText>
        </Flex>
      </Flex>
    </BaseLayout>
  );
};

export default Create;
