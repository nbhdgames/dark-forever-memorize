/**
 * Created by tdzl2003 on 2/1/17.
 */
import React from 'react';
import { View } from '../';
import styles from './Progress.less';

export default function Progress({
  value,
  maxValue,
  bgColor,
  barColor,
  className,
}) {
  const rate = maxValue > 0 ? value / maxValue : 1;
  return (
    <View
      className={[styles.container, className]}
      style={{ backgroundColor: bgColor }}
    >
      <View
        className={styles.round}
        style={{ flex: rate, backgroundColor: barColor }}
      />
      <View className={{ flex: 1 - rate }} />
    </View>
  );
}
