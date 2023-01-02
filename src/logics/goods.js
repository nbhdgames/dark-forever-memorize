/**
 * Created by tdzl2003 on 4/8/17.
 */

import { AffixInfo, InventorySlot } from './player';
import { goods, legends, affixes } from '../../data';

export function randomAffixValue(old, level) {
  return new AffixInfo().fromJS({
    key: old.key,
    value: old.affixData.generate(level),
    rebuilded: old.rebuilded,
  });
}

export function randomAffixes(config, level, blacklist) {
  const keys = config.filter((k) => !blacklist[k]);
  const totalWeight = keys.reduce(
    (v, key) => v + (affixes[key].weight || 1),
    0
  );
  let dice = Math.random() * totalWeight;
  const result = keys.find((key) => {
    const weight = affixes[key].weight || 1;
    if (dice < weight) {
      return true;
    }
    dice -= weight;
    return false;
  });

  blacklist[result] = true;

  return new AffixInfo().fromJS({
    key: result,
    value: affixes[result].generate(level),
  });
}

export function isValidAffix(key, affix, level) {
  const goodData = goods[key];
  const affixData = affixes[affix];

  if (affixData.maxLevel && level > affixData.maxLevel) {
    return false;
  }
  if (affixData.minLevel && level < affixData.minLevel) {
    return false;
  }
  if (
    affixData.validClasses &&
    affixData.validClasses.indexOf(goodData.class) === -1
  ) {
    return false;
  }
  if (
    affixData.validPositions &&
    affixData.validPositions.indexOf(goodData.position) === -1
  ) {
    return false;
  }

  return true;
}

const specialRate = __DEV__
  ? 1
  : Object.keys(legends).filter((v) => !legends[v].special).length / 100;

export function generateEquip(key, level, quality, legendType) {
  const validAffixes = Object.keys(affixes).filter((affix) =>
    isValidAffix(key, affix, level)
  );

  const generatedAffixes = [];

  const blacklist = {};
  for (let i = 0; i < (legendType ? quality - 1 : quality); i++) {
    generatedAffixes.push(randomAffixes(validAffixes, level || 0, blacklist));
  }

  if (legendType) {
    generatedAffixes.push(
      new AffixInfo().fromJS({
        key: legendType,
        value: legends[legendType].generate(level),
      })
    );
  }

  return new InventorySlot('loot').fromJS({
    key,
    level,
    count: 1,
    affixes: generatedAffixes,
    quality,
    legendType,
  });
}

const baseQualityRate = [1, 0.5, 0.05, 0.005, 0.0005, 0];

const equips = Object.keys(goods).filter((key) => goods[key].type === 'equip');

export function randomEquip(level, mfRate, position) {
  const dice = Math.random() / mfRate;
  const quality = Math.max(0, baseQualityRate.findIndex((v) => v < dice) - 1);

  let legendType = null;

  if (quality === 4) {
    if (Math.random() < specialRate) {
      const validLegends = Object.keys(legends).filter(
        (key) =>
          !legends[key].special &&
          (legends[key].minLevel || 0) <= level &&
          (legends[key].maxLevel || level) >= level &&
          (!position || goods[legends[key].type].position === position)
      );
      legendType =
        validLegends[(Math.random() * validLegends.length) | 0] || null;
    }
  }

  if (legendType) {
    return generateEquip(legends[legendType].type, level, quality, legendType);
  }
  const validEquips = equips.filter((key) => {
    return (
      (goods[key].minLevel || 0) <= level &&
      (goods[key].maxLevel || level) >= level &&
      (!position || goods[key].position === position)
    );
  });
  const key = validEquips[(Math.random() * validEquips.length) | 0];
  return generateEquip(key, level, quality, null);
}

export function getMaterialLevel(level) {
  if (level <= 30) {
    return 0;
  } else if (level <= 50) {
    return 1;
  } else if (level <= 75) {
    return 2;
  } else if (level <= 115) {
    return 3;
  } else if (level <= 140) {
    return 4;
  } else {
    return 5;
  }
}

export const materialKey = [
  [],
  ['dust1', 'dust2', 'dust3', 'dust4', 'dust5', 'dust6'],
  ['piece1', 'piece2', 'piece3', 'piece4', 'piece5', 'piece6'],
];

export function getDecomposeMatrials({ level, quality }) {
  const ret = {};
  for (let i = 0; i <= quality && i < 3; i++) {
    const key = materialKey[i][getMaterialLevel(level)];
    if (key) {
      ret[key] = 1;
    }
  }

  if (quality >= 3) {
    // 分解出神力
    ret.diamonds = Math.ceil(3 + (level / 100) * (1 << (quality - 3)));
  }
  return ret;
}
