import { Text, TextProps } from '@chakra-ui/react';

type AppTextProps = {
  color?: string;
  size?: string;
  weight?: string;
  decoration?: string;
  children: any;
} & TextProps;

const AppText: React.FC<AppTextProps> = ({
  color = 'white',
  size = 'md',
  weight = '400',
  decoration,
  children,
  ...props
}) => {
  return (
    <Text
      fontSize={size}
      color={color}
      fontWeight={weight}
      decoration={decoration}
      {...props}
    >
      {children}
    </Text>
  );
};

export default AppText;
