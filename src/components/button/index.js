import React from 'react';
import classnames from 'classnames';
import styles from './index.less';

export function Button({ type, size, className, children, to, ...others }) {
  return (
    <button
      className={classnames(
        styles.button,
        className,
        type && styles[type],
        size && styles[size]
      )}
      {...others}
    >
      {children}
    </button>
  );
}
