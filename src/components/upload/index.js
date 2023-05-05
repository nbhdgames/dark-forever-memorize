import React from 'react';
import classnames from 'classnames';
import styles from './index.less';

export function Upload({ className, children, uploadFile }) {
  const onInputClick = (event) => {
    event.target.value = '';
  };

  return (
    <div className={classnames(styles.upload, className)}>
      <label className={styles.content} for="upload">
        {children}
      </label>
      <input
        type="file"
        id="upload"
        onChange={uploadFile}
        onClick={onInputClick}
      />
    </div>
  );
}
