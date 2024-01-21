import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';
import * as React from 'react';
import { AppColors } from '../theme';

export interface SharedPanelOptions {
  catchOnCancel?: boolean;
  title?: string;
  noTitle?: boolean;
  size?: 'full' | 'xl' | 'lg' | 'md' | 'sm';
  render?: (onSubmit: () => void, onCancel: () => void) => React.ReactNode;
  noPadding?: boolean;
  closeButtonColor?: string;
}

interface SharedPanelProps extends SharedPanelOptions {
  open: boolean;
  onSubmit: () => void;
  onClose: () => void;
}

export const SharedPanel: React.FC<SharedPanelProps> = ({
  open,
  title,
  noTitle = false,
  size = 'md',
  closeButtonColor = AppColors.highlight,
  noPadding = false,
  render,
  onSubmit,
  onClose,
}) => {
  return (
    <Drawer isOpen={open} placement='right' onClose={onClose} size={size}>
      <DrawerOverlay w={'full'} />
      <DrawerContent h={'100%'} bgColor={AppColors.primary}>
        <DrawerCloseButton zIndex={5} color={closeButtonColor} />
        {noTitle ? (
          <></>
        ) : (
          <DrawerHeader borderBottomWidth='1px' color={AppColors.highlight}>{title}</DrawerHeader>
        )}

        <DrawerBody p={noPadding ? 0 : 6}>
          {render && render(onSubmit, onClose)}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
