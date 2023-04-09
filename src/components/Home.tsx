import { useSelector } from 'react-redux';
import { addExpense, addSaving, selectSalary } from 'redux/economySlice';
import { SalaryForm } from './SalaryForm';
import React from 'react';
import { FinancialEntryForm } from 'components/FinancialEntryForm';
import { formatPrice } from 'utils/numberUtils';
import { ExpensesTable } from 'components/ExpensesTable';
import { SavingsTable } from 'components/SavingsTable';
import { useAppDispatch } from 'hooks';

export const Home = () => {
  const dispatch = useAppDispatch();
  const salary = useSelector(selectSalary);

  return (
    <div>
      <h2>Home</h2>
      <div style={{ marginBottom: '10px' }}>
        {`Your salary is ${formatPrice(salary.toString())}`}
        <SalaryForm />
      </div>
      <FinancialEntryForm
        action={(name, value, description) =>
          dispatch(addExpense({ name, value, description }))
        }
        namePlaceholder={'Rent'}
        descriptionPlaceholder={'E-faktura'}
        buttonText={'Add expense'}
      />
      <ExpensesTable />
      <FinancialEntryForm
        action={(name, value, description) =>
          dispatch(addSaving({ name, value, description }))
        }
        namePlaceholder={'Car'}
        descriptionPlaceholder={'Autogiro - den 25e'}
        buttonText={'Add saving'}
      />
      <SavingsTable />
    </div>
  );
};
