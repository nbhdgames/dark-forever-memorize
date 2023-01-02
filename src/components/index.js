import React from 'react';
import classnames from 'classnames';
import styles from './index.less';

export * from './button';
export * from './input';

export function Text({ className, ...others }) {
  return <span className={classnames(styles.text, className)} {...others} />;
}

export function View({ className, ...others }) {
  return <div className={classnames(styles.view, className)} {...others} />;
}

export function TouchableOpacity({ className, ...others }) {
  return (
    <div
      className={classnames(styles.touchable, className)}
      {...others}
      role="button"
    />
  );
}
