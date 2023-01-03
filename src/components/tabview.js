import React from 'react';
import * as classnames from 'classnames';
import styles from './tabview.less';

export function ScrollableTabView({ className, children }) {
  const [active, setActive] = React.useState(0);
  const childArr = React.Children.toArray(children);

  return (
    <div className={classnames(className, styles.root)}>
      <div className={styles.tabs}>
        {childArr
          .map((v) => v.props.tabLabel)
          .map((v, i) => (
            <div
              key={i}
              className={classnames(styles.tab, active == i && styles.active)}
              onClick={() => setActive(i)}
            >
              {v}
            </div>
          ))}
      </div>
      <div
        className={styles.container}
        style={{ transform: `translateX(${active * -100}vw)` }}
      >
        {childArr.map((v, i) => (
          <div className={styles.content} key={i}>
            {v}
          </div>
        ))}
      </div>
    </div>
  );
}
