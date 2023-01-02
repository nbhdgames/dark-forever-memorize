/**
 * Created by tdzl2003 on 2/1/17.
 */

import React from 'react';
import { Text } from './';
import { observer } from 'mobx-react';
import { expr } from 'mobx-utils';

export default observer(function Field({ className, unit, field, ...others }) {
  return (
    <Text className={className} {...others}>
      {unit[field]}
    </Text>
  );
});

export const IntField = observer(function IntField({
  className,
  unit,
  field,
  ...others
}) {
  const display = expr(() => {
    const value = unit[field];

    if (value >= 1e11) {
      return ((value / 1e9) | 0) + 'B';
    }
    if (value >= 1e8) {
      return ((value / 1e6) | 0) + 'M';
    }
    if (value >= 1e5) {
      return ((value / 1e3) | 0) + 'K';
    }
    return value | 0;
  });
  return (
    <Text className={className} {...others}>
      {display}
    </Text>
  );
});

export const FixedField = observer(function FixedField({
  className,
  unit,
  field,
  digits = 1,
  mul = 1,
  inc = 0,
  ...others
}) {
  return (
    <Text className={className} {...others}>
      {((unit[field] + inc) * mul).toFixed(digits)}
    </Text>
  );
});
