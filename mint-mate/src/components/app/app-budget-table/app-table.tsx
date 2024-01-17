import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
} from '@chakra-ui/react';
import AppButton from '../app-button/app-button';
import AppText from '../app-text/app-text';
import { AppColors } from '../../../theme';
import useRandomColor from '../../../hooks/useColor';
import {
  BudgetItem,
  ColumnDefinition,
} from '../../../models/tables';

export type AppTableProps = {
  header?: string;
  columns: ColumnDefinition[];
  data: BudgetItem[];
  addRow?: boolean;
  removeRow?: boolean;
};

const AppTable: React.FC<AppTableProps> = ({
  header,
  columns,
  data,
  addRow = false,
  removeRow = false,
}) => {
  return (
    <Flex w={'full'} gap={3} direction={'column'} p={4}>
      <Flex
        w={'full'}
        display={!header ? 'none' : 'flex'}
        justify={'space-between'}
      >
        <AppText fontSize={'x-large'} fontWeight={'600'}>
          {header}
        </AppText>
      </Flex>
      <TableContainer>
        <Table variant={'simple'} w={'full'}>
          <Thead>
            {columns.map((x) => {
              return <Tr>{x.header}</Tr>;
            })}
          </Thead>
          <Tbody>
            {data.map((row, index) => {
              return (
                <Tr key={index}>
                  <Td>{row.date ? row.date.toString() : ''}</Td>
                  <Td>{row.title}</Td>
                  <Td>{row.description ? row.description : ''}</Td>
                  <Td>{row.value}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default AppTable;
