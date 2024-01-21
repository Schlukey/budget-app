import { Flex } from '@chakra-ui/react';
import useRandomColor from '../../../hooks/useColor';
import AppText from '../app-text/app-text';
import AppButton from '../app-button/app-button';
import { Budget } from '../../../models/budget';
import { AppColors } from '../../../theme';
import { DeleteIcon, ViewIcon } from '@chakra-ui/icons';

interface AppBudgetCardProps {
  budget: Budget;
  onBudgetClick: () => void;
  onBudgetDelete: () => void;
}

const AppBudgetCard: React.FC<AppBudgetCardProps> = ({
  budget,
  onBudgetClick,
  onBudgetDelete,
}) => {
  return (
    <Flex
      w={'full'}
      borderRadius={0}
      border={`1px solid ${AppColors.tertiary}`}
      justify={'space-between'}
      align={'center'}
      p={3}
    >
      <Flex direction={'column'}>
        <AppText
          fontSize={'large'}
          fontWeight={'bold'}
          color={AppColors.highlight}
        >
          {budget.title}
        </AppText>
        <AppText>{budget.dateCreated.toString().slice(0, 10)}</AppText>
      </Flex>
      <Flex gap={3}>
        <AppButton leftIcon={<ViewIcon />} onClick={onBudgetClick}>
          View
        </AppButton>
        <AppButton leftIcon={<DeleteIcon />} onClick={onBudgetDelete}>
          Delete
        </AppButton>
      </Flex>
    </Flex>
  );
};

export default AppBudgetCard;
