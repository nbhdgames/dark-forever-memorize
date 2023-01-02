/**
 * Created by tdzl2003 on 2/1/17.
 */

import React from 'react';
import { observer } from 'mobx-react';
import Progress from './Progress';
import Cp from './Cp';

export const HpBar = observer(function HpBar({ unit, className }) {
  return (
    <Progress
      className={className}
      value={unit.hp}
      maxValue={unit.maxHp}
      bgColor="#ddd"
      barColor="red"
    />
  );
});

export const MpBar = observer(function MpBar({ unit, className }) {
  return (
    <Progress
      className={className}
      value={unit.mp}
      maxValue={unit.maxMp}
      bgColor="#ddd"
      barColor="blue"
    />
  );
});

export const RpBar = observer(function RpBar({ unit, className }) {
  return (
    <Progress
      className={className}
      value={unit.rp}
      maxValue={unit.maxRp}
      bgColor="#ddd"
      barColor="#f62"
    />
  );
});

const color = '#17FFDA';

export const EpBar = observer(function EpBar({ unit, className }) {
  return (
    <Progress
      className={className}
      value={unit.ep}
      maxValue={unit.maxEp}
      bgColor="#ddd"
      barColor="#10A78F"
    />
  );
});

export const ExpBar = observer(function ExpBar({ unit, className }) {
  return (
    <Progress
      className={className}
      value={unit.exp}
      maxValue={unit.maxExp}
      bgColor="#ddd"
      barColor="yellow"
    />
  );
});

export const CastBar = observer(function CastBar({ unit, className }) {
  if (!unit.casting && !unit.reading) {
    return null;
  }
  return (
    <Progress
      className={className}
      value={unit.castingRest}
      maxValue={unit.castingTime}
      bgColor="#ddd"
      barColor="#999"
    />
  );
});
export const CpBar = observer(function CpBar({ unit }) {
  const max = unit.runAttrHooks(3, 'maxComboPoint');
  return (
    <Cp
      value={unit.comboPoint}
      maxValue={max}
      bgColor="#ccc"
      activeColor="#f37800"
    />
  );
});
export const Bar = Progress;
