/**
 * Created by tdzl2003 on 2/1/17.
 */
import React from 'react';
import { View } from '../';
import styles from './Cp.less';

export default function Cp({ value, maxValue, bgColor, activeColor }) {
  const max = [];
  for (let i = 0; i < maxValue; i++) {
    max.push(i);
  }
  return (
    <View className={styles.container}>
      {max.map((v, i) => (
        <View className={style.content} key={i}>
          <View
            className={styles.point}
            style={{ backgroundColor: value - 1 < i ? bgColor : activeColor }}
          />
        </View>
      ))}
    </View>
  );
}
