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

export function TouchableOpacity({
  activeOpacity,
  className,
  onPress,
  ...others
}) {
  return (
    <div
      className={classnames(styles.touchable, className)}
      onClick={onPress}
      {...others}
      role="button"
    />
  );
}

export function ScrollView({ className, children, ...others }) {
  return (
    <div
      className={classnames(styles.scrollView, className)}
      {...others}
      role="button"
    >
      <div className={styles.scrollViewContent}>{children}</div>
    </div>
  );
}

const StaticRender = React.memo(function StaticRender({ render, data }) {
  return render(data);
});

export function ListView({
  enableEmptySections,
  dataSource,
  renderFooter,
  renderRow,
  ...others
}) {
  return (
    <ScrollView {...others}>
      {dataSource &&
        dataSource.map((v) => (
          <StaticRender render={renderRow} data={v}></StaticRender>
        ))}
      <StaticRender render={renderFooter} />
    </ScrollView>
  );
}

ListView.DataSource = class DataSource {
  constructor() {}

  cloneWithRows(rows) {
    return [...rows];
  }
};
