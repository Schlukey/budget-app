import React, { useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import BaseLayout from '../../components/layouts/base-layout';

const Create: React.FC = () => {
  return (
    <BaseLayout add={false}>
      <Flex></Flex>
    </BaseLayout>
  );
};

export default Create;
