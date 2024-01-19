import { useState } from 'react';
import BaseLayout from '../../components/layouts/base-layout';
import { Flex } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/react';
import AppText from '../../components/app/app-text/app-text';
import { AppColors } from '../../theme';
import AppButton from '../../components/app/app-button/app-button';
import { useDispatch } from 'react-redux';
import { setSalary } from '../../store/slices/income.slice';

const Generate: React.FC = () => {
  const dispatch = useDispatch();
  const [salaryInput, setSalaryInput] = useState<number>(0);

  const handleBudgetGen = () => {
    
  }
  return (
    <BaseLayout>
      <Flex p={4} w={'full'} direction={'column'} gap={4}>
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
              dispatch(setSalary(salaryInput));
            }}
          >
            Generate
          </AppButton>
        </Flex>
      </Flex>
    </BaseLayout>
  );
};

export default Generate;
