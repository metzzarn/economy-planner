import React from 'react';
import { selectExpenses, updateExpense } from 'redux/economySlice';
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

export const ExpensesTable = () => {
  const dispatch = useAppDispatch();
  const expenses = useSelector(selectExpenses);

  const rows = () => {
    return expenses.map((expense, index) => {
      const updateExpenseDescription = (value: string) => {
        const state = { name: value, value: expense.value, index };
        return dispatch(updateExpense(state));
      };
      const updateExpenseValue = (value: number) => {
        const state = { name: expense.name, value, index };
        return dispatch(updateExpense(state));
      };
      return (
        <TableRow key={index}>
          <TableRowItem
            index={index}
            allowEdit
            action={updateExpenseDescription}
          >
            {expense.name}
          </TableRowItem>
          <TableRowItem index={index} allowEdit action={updateExpenseValue}>
            {formatPrice(expense.value.toString())}
          </TableRowItem>
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
          {expenses.reduce((acc, curr) => acc + curr.value, 0)}
        </TableFooterItem>
      </TableFooter>
    );
  };

  return (
    <div style={{ width: '700px' }}>
      <h2>Expenses</h2>
      <If true={expenses?.length > 0}>
        <Table rows={rows()} footer={footer()}>
          <TableHeader>Description</TableHeader>
          <TableHeader width={'20%'}>Amount</TableHeader>
        </Table>
      </If>
    </div>
  );
};
