import React, { useState, useEffect } from 'react';
import { Flex, Input } from '@chakra-ui/react';
import BaseLayout from '../../components/layouts/base-layout';
import AppButton from '../../components/app/app-button/app-button';
import AppText from '../../components/app/app-text/app-text';
import { AppColors } from '../../theme';
import { BudgetItem } from '../../models/budget';
import AppTable from '../../components/app/app-budget-table/app-table';
import { incomeColumns } from '../../components/table-columns/columns';
import { useDispatch, useSelector } from 'react-redux';
import {
  addIcomeSource,
  removeIncomeSource,
  resetIcome,
  selectIncomes,
  selectTotalIncome,
  setTotalIncomeValue,
} from '../../store/slices/income.slice';
import { v4 as uuidv4 } from 'uuid';
import {
  addExpenseSource,
  removeExpenseSource,
  resetExpense,
  selectExpenses,
  selectTotalExpense,
  setTotalExpenseValue,
} from '../../store/slices/expense.slice';
import { Budget } from '../../models/budget';
import { createBudget } from '../../store/slices/budget.slice';

const Create: React.FC = () => {
  const dispatch = useDispatch();
  const storeIncomes = useSelector(selectIncomes);
  const totalIncomeValue = useSelector(selectTotalIncome);
  const totalExpenseValue = useSelector(selectTotalExpense);
  const storeExpenses = useSelector(selectExpenses);

  const [budgetTitle, setBudgetTitle] = useState<string>();
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

  const handleBudgetSave = () => {
    const newBudget: Budget = {
      id: uuidv4(),
      title: budgetTitle ?? 'check title',
      dateCreated: new Date(),
      incomes: storeIncomes,
      expenses: storeExpenses,
      totalValue: leftOver,
    };
    dispatch(createBudget(newBudget));
  };

  useEffect(() => {
    dispatch(setTotalExpenseValue(totalExpense));
    dispatch(setTotalIncomeValue(totalIncome));
    getIncomeTotal();
    getExpenseTotal();
    const totalLeftOver = totalIncomeValue - totalExpenseValue;
    setLeftOver(totalLeftOver);
  }, [storeIncomes, storeExpenses, leftOver]);

  return (
    <BaseLayout add={false}>
      <Flex w={'full'} p={4} gap={4}>
        <Flex w={'full'} direction={'column'} align={'start'} gap={4} p={6}>
          <Flex w={'full'} justify={'space-between'} align={'center'}>
            <AppText fontWeight={'600'} fontSize={'x-large'}>
              New Budget
            </AppText>
            <Flex gap={3} align={'center'}>
              <Input
                border={`1px solid ${AppColors.highlight}`}
                // w={'50%'}
                borderRadius={0}
                name='title'
                value={budgetTitle}
                color={'white'}
                placeholder='Budget Title'
                onChange={(e) => {
                  e.preventDefault();
                  setBudgetTitle(e.target.value);
                }}
              />
              <AppButton onClick={() => {}}>Save</AppButton>
            </Flex>
          </Flex>
          <Flex direction={'column'} gap={4} w={'full'} minH={'200px'} pb={6}>
            <AppText
              fontWeight={'600'}
              size={'large'}
              color={AppColors.highlight}
            >
              Income
            </AppText>
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
            <AppTable
              total={totalIncome}
              removeItem={(item: BudgetItem) => {
                removeIncomeItem(item);
              }}
              columns={incomeColumns}
              data={storeIncomes || []}
            />
          </Flex>

          <Flex direction={'column'} gap={4} w={'full'} minH={'450px'}>
            <AppText
              fontWeight={'600'}
              size={'large'}
              color={AppColors.highlight}
            >
              Expenses
            </AppText>
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
              removeItem={(item: BudgetItem) => {
                removeExpenseItem(item);
              }}
              columns={incomeColumns}
              data={storeExpenses || []}
              total={totalExpense}
            />
          </Flex>
          <AppButton onClick={() => handleBudgetSave()}>Save Budget</AppButton>
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
