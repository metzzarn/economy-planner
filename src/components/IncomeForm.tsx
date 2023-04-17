import { Field, Form } from 'react-final-form';
import { convertToNumber } from 'utils/numberUtils';
import React from 'react';
import { useAppDispatch } from 'hooks';
import { addIncome } from 'redux/incomeSlice';

export interface IncomeFormValues {
  netIncome: string;
}

export const IncomeForm = () => {
  const dispatch = useAppDispatch();

  return (
    <Form
      onSubmit={(income: IncomeFormValues) =>
        dispatch(addIncome({ value: convertToNumber(income.netIncome) }))
      }
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <Field
              name={'netIncome'}
              component={'input'}
              type={'text'}
              placeholder={'0,0 kr'}
            />
          </div>
          <div>
            <button type={'submit'}>Add income</button>
          </div>
        </form>
      )}
    />
  );
};