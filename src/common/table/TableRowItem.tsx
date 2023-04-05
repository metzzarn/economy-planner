import styles from 'common/table/TableRowItem.module.css';
import React, { ReactNode, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { FormValues } from 'components/FinancialEntryForm';

interface Props {
  children: ReactNode;
  allowEdit?: boolean;
  index?: number;
  action?: (value: any) => void;
}
export const TableRowItem = (props: Props) => {
  const [showEditIcon, setShowEditIcon] = useState(false);
  const [editValue, setEditValue] = useState(false);
  const requiredField = (value: string) => (value ? undefined : 'Required');

  const input = (
    <Form
      onSubmit={(formValues: FormValues) => {
        if (!formValues.value) {
          return;
        }
        console.log('Submit');

        props.action && props.action(formValues.value);
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <Field
              name={'value'}
              component={'input'}
              type={'text'}
              validate={requiredField}
            >
              {({ input, meta }) => (
                <div>
                  <input
                    {...input}
                    onBlur={() => {
                      console.log('onBlur');
                      setEditValue(false);
                      return handleSubmit;
                    }}
                    type={'text'}
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
          </div>
        </form>
      )}
    />
  );

  return (
    <th
      className={styles.item}
      onMouseEnter={() => props.allowEdit && setShowEditIcon(true)}
      onMouseLeave={() => props.allowEdit && setShowEditIcon(false)}
      onClick={() => {
        console.log('onClick');
        setEditValue(true);
      }}
    >
      {editValue ? input : props.children}
      {!editValue && showEditIcon && <span>[X]</span>}
    </th>
  );
};
