import styles from 'common/table/Table.module.css';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  rows?: ReactNode[];
  footer?: ReactNode;
}

export const Table = (props: Props) => {
  return (
    <table className={styles.table}>
      <thead>{props.children}</thead>
      {props.rows}
      {props.footer}
    </table>
  );
};
