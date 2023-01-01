export * from './button';
export * from './input';

import classnames from 'classnames';
import styles from './index.less';

export function Text({ className, ...others }) {
  return <span className={classnames(styles.text, className)} {...others} />;
}

export function View({ className, ...others }) {
  return <div className={classnames(styles.view, className)} {...others} />;
}
