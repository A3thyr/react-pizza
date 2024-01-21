import { FC } from 'react';
import styles from './NotFoundInfo.module.scss';

export const NotFoundInfo: FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>404</span>
        <br />
        Not Found
      </h1>
    </div>
  );
};
