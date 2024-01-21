import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Flex,
  Tfoot,
} from '@chakra-ui/react';
import AppText from '../app-text/app-text';
import { ColumnDefinition } from '../../../models/tables';
import { BudgetItem } from '../../../models/budget';
import { AppColors } from '../../../theme';
import AppButton from '../app-button/app-button';

export type AppTableProps = {
  header?: string;
  columns: ColumnDefinition[];
  remove?: boolean;
  total: number;
  data: BudgetItem[];
  removeItem: (item: BudgetItem) => void;
};

const AppTable: React.FC<AppTableProps> = ({
  header,
  columns,
  total = 0,
  remove = true,
  data,
  removeItem,
}) => {
  return (
    <Flex w={'100%'} gap={3} direction={'column'} color={'white'}>
      <Flex
        w={'full'}
        display={!header ? 'none' : 'flex'}
        justify={'space-between'}
      >
        <AppText fontSize={'x-large'} fontWeight={'600'}>
          {header}
        </AppText>
      </Flex>
      <TableContainer w={'full'}>
        <Table variant={'simple'} w={'full'}>
          <Thead w={'full'}>
            <Tr>
              {columns.map((x, i) => {
                return <Td key={i}>{x.header}</Td>;
              })}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row, index) => {
              return (
                <Tr key={index}>
                  <Td>{row.dateCreated.toString().slice(0, 10)}</Td>
                  <Td>{row.title}</Td>
                  <Td>{row.value}</Td>
                  {remove && (
                    <Td
                      maxW={'20px'}
                      display={'flex'}
                      alignItems={'center'}
                      justifyItems={'center'}
                    >
                      <AppButton
                        size={'xs'}
                        borderRadius={'full'}
                        onClick={() => removeItem(row)}
                      >
                        -
                      </AppButton>
                    </Td>
                  )}
                </Tr>
              );
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Td color={AppColors.highlight} fontWeight={'bold'}>
                Total
              </Td>
              <Td></Td>
              <Td color={AppColors.highlight} fontWeight={'bold'}>
                R{total}
              </Td>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default AppTable;
