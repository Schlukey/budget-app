import { useRef, useState } from 'react';
import BaseLayout from '../../components/layouts/base-layout';
import { Flex } from '@chakra-ui/layout';
import { Box, Checkbox, Input } from '@chakra-ui/react';
import AppText from '../../components/app/app-text/app-text';
import { AppColors } from '../../theme';
import AppButton from '../../components/app/app-button/app-button';
import { useDispatch } from 'react-redux';
import { setSalary } from '../../store/slices/income.slice';
import { fixedExpenses, variableExpenses } from '../../constants';
import { BudgetItem, Presets } from '../../models/budget';
import AppTable from '../../components/app/app-budget-table/app-table';
import { budgetColumns } from '../../components/table-columns/columns';
import { v4 as uuidv4 } from 'uuid';

const Generate: React.FC = () => {
  const dispatch = useDispatch();
  const expenses: Presets[] = [];
  const salary = useRef<HTMLInputElement>(null);
  const [salaryInput, setSalaryInput] = useState<number>();
  const [calculatedExpenses, setCalculatedExpenses] = useState<BudgetItem[]>(
    []
  );
  const [overViewItems, setOverviewItems] = useState<BudgetItem[]>([]);
  const [overviewTotal, setOverviewTotal] = useState<number>();

  const [generatedBudget, setGeneratedBudget] = useState<boolean>(false);

  const handleBudgetGeneration = () => {
    if (salaryInput === 0 || undefined) {
      salary.current?.focus();
    } else {
      const newExpenses = expenses.filter(
        (expense, i) => expenses.indexOf(expense) === i
      );

      const calculations: BudgetItem[] = newExpenses.map((x) => {
        return {
          id: uuidv4(),
          dateCreated: new Date(),
          title: x.name,
          value: Math.floor(salaryInput! * x.value),
        } as BudgetItem;
      });
      setCalculatedExpenses(calculations);
      console.log('calculated expenses', calculations);
      setGeneratedBudget(true);
      let total = 0;
      calculations.map((x) => {
        return (total += x.value);
      });
      const save = salaryInput! * 0.2;
      setOverviewItems([
        {
          id: uuidv4(),
          dateCreated: new Date(),
          title: 'Income',
          value: salaryInput!,
        },
        {
          id: uuidv4(),
          dateCreated: new Date(),
          title: 'Expenses',
          value: total,
        },
        {
          id: uuidv4(),
          dateCreated: new Date(),
          title: 'Savings',
          value: save,
        },
      ]);
      setOverviewTotal(salaryInput! - total - save);
    }
  };

  return (
    <BaseLayout>
      <Flex direction={'column'} gap={3} w={'full'} pb={10}>
        <Flex p={4} px={6} w={'full'} direction={'column'} gap={8}>
          <AppText
            size={'x-large'}
            fontWeight={'bold'}
            color={AppColors.highlight}
          >
            Enter Salary
          </AppText>
          <Flex gap={3}>
            <Input
              borderRadius={0}
              border={`1px solid ${AppColors.highlight}`}
              type='number'
              ref={salary}
              value={salaryInput}
              placeholder='Salary'
              w={'180px'}
              color={'white'}
              onChange={(e) => {
                e.preventDefault();
                setSalaryInput(+e.target.value);
              }}
            />
            <AppButton
              onClick={() => {
                dispatch(setSalary(salaryInput!));
              }}
            >
              Set Salary
            </AppButton>
          </Flex>
          <AppText
            fontSize={'large'}
            fontWeight={'600'}
            color={AppColors.highlight}
          >
            Fixed Expenses
          </AppText>
          <Flex
            gap={6}
            w={'full'}
            align={'center'}
            justify={'start'}
            maxW={'100%'}
            overflow={'scroll'}
          >
            {fixedExpenses.map((expense, index) => {
              return (
                <Flex
                  align={'center'}
                  justify={'center'}
                  direction={'column'}
                  key={index}
                >
                  <AppText>{expense.name}</AppText>
                  <Checkbox
                    value={expense.value}
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        expenses.push(expense);
                      }
                    }}
                  />
                </Flex>
              );
            })}
          </Flex>
          <AppText
            fontSize={'large'}
            fontWeight={'600'}
            color={AppColors.highlight}
          >
            Vairable Expenses
          </AppText>
          <Flex
            gap={6}
            w={'full'}
            align={'center'}
            justify={'start'}
            maxW={'100%'}
            overflow={'scroll'}
          >
            {variableExpenses.map((expense, index) => {
              return (
                <Flex
                  align={'center'}
                  justify={'center'}
                  direction={'column'}
                  key={index}
                >
                  <AppText>{expense.name}</AppText>
                  <Checkbox
                    value={expense.value}
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        expenses.push(expense);
                      }
                    }}
                  />
                </Flex>
              );
            })}
          </Flex>
        </Flex>
        <AppButton
          ml={6}
          maxW={'180px'}
          onClick={async () => {
            await handleBudgetGeneration();
          }}
        >
          Generate
        </AppButton>
        <Flex
          display={generatedBudget ? 'flex' : 'none'}
          w={'full'}
          gap={5}
          direction={{ base: 'column', lg: 'row' }}
          align={'start'}
          p={6}
        >
          <AppTable
            columns={budgetColumns}
            data={calculatedExpenses || []}
            removeItem={() => {}}
            total={0}
            remove={false}
          />
          <AppTable
            columns={budgetColumns}
            data={overViewItems || []}
            removeItem={() => {}}
            total={overviewTotal || 0}
            remove={false}
          />
        </Flex>
      </Flex>
    </BaseLayout>
  );
};

export default Generate;
