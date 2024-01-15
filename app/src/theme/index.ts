import { extendTheme, ComponentStyleConfig } from '@chakra-ui/react';

const AppColors = {
  primary: '#222222',
  secondary: '#333333',
  tertiary: '#383838',
  highlight: '#32E0C4',
  appTextColor: '#EEEEEE'
};

const buttonConfig: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: '400',
    color: '#EEEEEE',
    rounded: 'md',
    border: `1px solid ${AppColors.secondary}`,
    cursor: 'pointer',
    bgColor: '#222831',
  },
  sizes: {
    xs: {
      fontSize: '12px',
      px: 2,
      py: 1,
    },
    sm: {
      fontSize: '16px',
    },
    md: {
      fontSize: '18px',
      px: 8,
      py: 4,
    },
  },
  variants: {
    ghost: {
      bgColor: 'transparent',
      border: `1px solid ${AppColors.tertiary}`,
      color: '#EEEEEE',
    },
  },
  defaultProps: {
    size: 'sm',
    variant: 'solid',
  },
};

const theme = extendTheme({
  components: {
    Button: buttonConfig,
    Input: {
      sizes: {
        lg: {
          field: {
            borderRadius: 'none',
          },
        },
        md: {
          field: {
            borderRadius: 'none',
          },
        },
        sm: {
          field: {
            borderRadius: 'none',
          },
        },
        xs: {
          field: {
            borderRadius: 'none',
          },
        },
      },
    },
  },
});

type AppButtonVariants = 'ghost' | 'solid';

export { AppColors, theme };
export type { AppButtonVariants };
