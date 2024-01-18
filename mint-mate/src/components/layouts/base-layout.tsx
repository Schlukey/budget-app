import React, { useState, useEffect, ReactNode } from 'react';
import { Flex, useBreakpointValue } from '@chakra-ui/react';
import { AppColors } from '../../theme';
import AppButton from '../app/app-button/app-button';
import AppText from '../app/app-text/app-text';
import Header from './header';
import { RoutesList } from '../../router/router';
import { useNavigate } from 'react-router-dom';

type BaseLayoutProps = {
  children?: ReactNode;
  back?: boolean;
  add?: boolean;
};

const BaseLayout: React.FC<BaseLayoutProps> = ({ back, add, children }) => {
  const navigate = useNavigate();
  const navLinks = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'New Budget',
      href: '/create',
    },
    {
      label: 'Track',
      href: '/track',
    },
    {
      label: 'Generate Budget',
      href: '/generate'
    }
  ];
  const variant = useBreakpointValue({
    base: 'mobile',
    lg: 'desktop',
  });

  return (
    <Flex w={'100vw'} h={'100vh'} overflowY={'auto'} overflowX={'hidden'}>
      <Flex
        direction={'column'}
        minW={'200px'}
        p={6}
        gap={4}
        bgColor={AppColors.secondary}
        display={variant === 'desktop' ? 'flex' : 'none'}
      >
        <AppText fontSize={{ base: 'md', lg: 'x-large' }} fontWeight={'500'}>
          Pages
        </AppText>
        {navLinks.map((link, i) => {
          return (
            <AppText
              key={i}
              _hover={{
                color: AppColors.highlight,
                transform: 'translateY(-2px)',
                transition: '0.2s',
                fontWeight: '600',
              }}
              cursor={'pointer'}
              onClick={() => navigate(link.href)}
            >
              {link.label}
            </AppText>
          );
        })}
      </Flex>
      <Flex
        direction={'column'}
        minH={'10vh'}
        w={'full'}
        bgColor={AppColors.primary}
        overflow={'scroll'}
      >
        <Header backButton={back} addButton={add} />
        {children}
      </Flex>
    </Flex>
  );
};

export default BaseLayout;
