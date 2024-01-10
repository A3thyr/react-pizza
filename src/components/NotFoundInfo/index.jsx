import React from 'react';

import styles from './NotFoundInfo.module.scss';

export const NotFoundInfo = () => {
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
