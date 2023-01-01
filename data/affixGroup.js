/**
 * Created by tdzl2003 on 2/4/17.
 */

exports.level1Weapon = {
  atk: 10,
  atkMul: 2,
  critRate: 3,
  critBonus: 3,
  leech: 5,
  str: 5,
  dex: 5,
  int: 5,
  sta: 5,
};

exports.level1Stick = {
  hpFromKill: 5,
  mpFromKill: 5,
  mpRecovery: 5,
  critRate: 3,
  critBonus: 3,
  str: 5,
  dex: 5,
  int: 5,
  sta: 5,
};

exports.level1Armor = {
  maxHp: 20,
  maxMp: 10,
  hpRecovery: 10,
  mpRecovery: 10,
  def: 20,
  str: 10,
  dex: 10,
  int: 10,
  sta: 10,
};

exports.level2Weapon = {
  ...exports.level1Weapon,
  hpFromKill: 1,
};

exports.level2Stick = {
  ...exports.level1Stick,
};

exports.level2Armor = {
  ...exports.level1Armor,
  critRate: 3,
  critBonus: 3,

  fireResist: 5,
  fireAbsorb: 1,

  darkResist: 5,
  darkAbsorb: 1,
};
