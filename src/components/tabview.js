import React from 'react';
import * as classnames from 'classnames';
import styles from './tabview.less';

export function ScrollableTabView({ className, children }) {
  const childArr = React.Children.toArray(children);

  return (
    <div className={classnames(className, styles.root)}>
      <div className={styles.tabs}>
        {childArr
          .map((v) => v.props.tabLabel)
          .map((v, i) => (
            <div>{v}</div>
          ))}
      </div>
      <div className={styles.container}>
        {childArr.map((v) => (
          <div className={styles.content}>{v}</div>
        ))}
      </div>
    </div>
  );
}
