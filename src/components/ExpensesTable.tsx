import React from 'react';
import {
  removeExpense,
  selectExpenses,
  updateExpense,
} from 'redux/expensesSlice';
import { Table } from 'common/table/Table';
import { TableHeader } from 'common/table/TableHeader';
import { useSelector } from 'react-redux';
import { TableRow } from 'common/table/TableRow';
import { TableRowItem } from 'common/table/TableRowItem';
import { formatPrice } from 'utils/numberUtils';
import { TableFooter } from 'common/table/TableFooter';
import { TableFooterItem } from 'common/table/TableFooterItem';
import { If } from 'common/If';
import { useAppDispatch } from 'hooks';
import { FinancialEntry } from 'redux/common';

export const ExpensesTable = () => {
  const dispatch = useAppDispatch();
  const expenses = useSelector(selectExpenses);

  const rows = () => {
    return expenses.map((expense: FinancialEntry, index: number) => {
      const updateName = (value: string) => {
        return dispatch(
          updateExpense({
            name: value,
            value: expense.value,
            description: expense.description,
            index,
          })
        );
      };
      const updateValue = (value: number) => {
        return dispatch(
          updateExpense({
            name: expense.name,
            value,
            description: expense.description,
            index,
          })
        );
      };
      const updateDescription = (description: string) => {
        return dispatch(
          updateExpense({
            name: expense.name,
            value: expense.value,
            description: description,
            index,
          })
        );
      };
      return (
        <TableRow key={index}>
          <TableRowItem
            index={index}
            allowEdit
            action={updateName}
            value={expense.name}
          />
          <TableRowItem
            index={index}
            allowEdit
            action={updateValue}
            value={formatPrice(expense.value.toString())}
          />
          <TableRowItem
            index={index}
            allowEdit
            action={updateDescription}
            value={expense.description}
          />
          <TableRowItem
            style={{ cursor: 'pointer' }}
            value={'X'}
            index={index}
            onClick={() => dispatch(removeExpense(index))}
          />
        </TableRow>
      );
    });
  };

  const footer = () => {
    return (
      <TableFooter>
        <TableFooterItem>
          <span style={{ fontWeight: 'bold' }}>Total</span>
        </TableFooterItem>
        <TableFooterItem>
          {expenses.reduce(
            (acc: number, curr: FinancialEntry) => acc + curr.value,
            0
          )}
        </TableFooterItem>
      </TableFooter>
    );
  };

  return (
    <div style={{ width: '700px' }}>
      <h2>Expenses</h2>
      <If true={expenses?.length > 0}>
        <Table rows={rows()} footer={footer()}>
          <TableHeader>Name</TableHeader>
          <TableHeader width={'20%'}>Amount</TableHeader>
          <TableHeader>Description</TableHeader>
          <TableHeader width={'5%'}></TableHeader>
        </Table>
      </If>
    </div>
  );
};
