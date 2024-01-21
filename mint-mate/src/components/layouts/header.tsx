import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  useBreakpointValue,
} from '@chakra-ui/react';
import { AppColors } from '../../theme';
import AppText from '../app/app-text/app-text';
import outlineLogo from '../assets/outline-logo.svg';
import React from 'react';
import { AddIcon, ArrowBackIcon, HamburgerIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { RoutesList } from '../../router/router';
import { usePanel } from '../../providers/service';
import { navLinks } from '../../constants/links';

interface HeaderProps {
  backButton?: boolean;
  addButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  backButton = true,
  addButton = true,
}) => {
  const navigate = useNavigate();
  const panel = usePanel();

  const variant = useBreakpointValue({
    base: 'mobile',
    lg: 'desktop',
  });

  const handleMenu = () => {
    panel({
      title: 'Pages',
      size: 'lg',
      render: (onSubmit) => {
        return (
          <Flex w={'full'} gap={3} direction={'column'}>
            {navLinks.map((x) => {
              return (
                <AppText
                  _hover={{
                    color: AppColors.highlight,
                    translate: 'transformY(-3px)',
                  }}
                  fontWeight={'bold'}
                  onClick={() => {
                    navigate(x.href);
                    onSubmit();
                  }}
                >
                  {x.label}
                </AppText>
              );
            })}
          </Flex>
        );
      },
    });
  };

  return (
    <Flex
      direction={'row'}
      justify={'center'}
      align={'center'}
      bgColor={AppColors.secondary}
      color={AppColors.appTextColor}
      p={4}
      pos={'relative'}
    >
      {variant === 'desktop' ? (
        <Flex
          display={backButton ? 'flex' : 'none'}
          p={2}
          bg='transparent'
          align={'center'}
          justify={'center'}
          pos={'absolute'}
          top={12}
          left={6}
          onClick={() => navigate(RoutesList.Dashboard)}
        >
          <ArrowBackIcon color={AppColors.highlight} w={'25px'} h={'25px'} />
        </Flex>
      ) : (
        <Flex
          display={backButton ? 'flex' : 'none'}
          p={2}
          bg='transparent'
          align={'center'}
          justify={'center'}
          pos={'absolute'}
          top={12}
          left={6}
          onClick={() => handleMenu()}
        >
          <HamburgerIcon color={AppColors.highlight} w={'25px'} h={'25px'} />
        </Flex>
      )}
      <Flex direction={'column'} align={'center'}>
        <Image src={outlineLogo} maxW={'65px'} />
        <AppText
          fontSize={'x-large'}
          fontWeight={'600'}
          color={AppColors.highlight}
        >
          MintMate
        </AppText>
      </Flex>
      <Flex
        display={addButton ? 'flex' : 'none'}
        p={2}
        bg='transparent'
        align={'center'}
        justify={'center'}
        pos={'absolute'}
        top={12}
        right={6}
        onClick={() => navigate(RoutesList.Create)}
      >
        <AddIcon color={AppColors.highlight} />
      </Flex>
    </Flex>
  );
};

export default Header;
