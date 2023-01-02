/**
 * Created by tdzl2003 on 2/1/17.
 */

import React from 'react';
import { observer } from 'mobx-react';
import Progress from './Progress';
import Cp from './Cp';

export const HpBar = observer(function HpBar({ unit, style }) {
  return (
    <Progress
      style={style}
      value={unit.hp}
      maxValue={unit.maxHp}
      bgColor="#ddd"
      barColor="red"
    />
  );
});

export const MpBar = observer(function MpBar({ unit, style }) {
  return (
    <Progress
      style={style}
      value={unit.mp}
      maxValue={unit.maxMp}
      bgColor="#ddd"
      barColor="blue"
    />
  );
});

export const RpBar = observer(function RpBar({ unit, style }) {
  return (
    <Progress
      style={style}
      value={unit.rp}
      maxValue={unit.maxRp}
      bgColor="#ddd"
      barColor="#f62"
    />
  );
});

const color = '#17FFDA';

export const EpBar = observer(function EpBar({ unit, style }) {
  return (
    <Progress
      style={style}
      value={unit.ep}
      maxValue={unit.maxEp}
      bgColor="#ddd"
      barColor="#10A78F"
    />
  );
});

export const ExpBar = observer(function ExpBar({ unit, style }) {
  return (
    <Progress
      style={style}
      value={unit.exp}
      maxValue={unit.maxExp}
      bgColor="#ddd"
      barColor="yellow"
    />
  );
});

export const CastBar = observer(function CastBar({ unit, style }) {
  if (!unit.casting && !unit.reading) {
    return null;
  }
  return (
    <Progress
      style={style}
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
