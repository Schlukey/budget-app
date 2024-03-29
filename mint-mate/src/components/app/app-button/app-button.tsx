import { Button, ButtonProps } from '@chakra-ui/react';
import { AppColors } from '../../../theme';
import { AppButtonVariants } from '../../../theme';

export type AppButtonProps = {
  bgColor?: string;
  color?: string;
  variant?: AppButtonVariants;
} & ButtonProps;

const AppButton: React.FC<AppButtonProps> = ({
  bgColor = AppColors.secondary,
  variant = 'solid',
  children,
  ...props
}) => {
  return (
    <Button
      cursor={'pointer'}
      bg={bgColor}
      border={`1px solid ${AppColors.tertiary}`}
      _hover={{
        transform: 'translateY(-3px)',
        boxShadow: `2px 2px 0px 0px ${AppColors.highlight} `,
      }}
      color={AppColors.highlight}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AppButton;
