import { Input, InputProps, FormControl, FormLabel } from '@chakra-ui/react';
import { AppColors } from '../../../theme';

export type InputType = 'text' | 'number' | 'email' | 'file' | 'tel';

export interface AppInputProps extends InputProps {
  name: string;
  inputType: InputType;
  label?: string;
  placeholder?: string;
  placeholderColor?: string;
  color?: string;
  inputBorder?: string;
}

const AppInput: React.FC<AppInputProps> = ({
  name,
  inputType,
  label,
  color = 'white',
  placeholderColor = 'white',
  placeholder,
  inputBorder = `1px solid ${AppColors.highlight}`
}) => {
  return (
    <FormControl>
      <FormLabel color={color}>{label}</FormLabel>
      <Input
        name={name}
        border={inputBorder}
        borderRadius={0}
        type={inputType}
        placeholder={placeholder}
        _placeholder={{
          color: placeholderColor
        }}
        textColor={color}
      ></Input>
    </FormControl>
  );
};

export default AppInput;
