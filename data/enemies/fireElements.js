/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = [
  {
    key: 'kakarif.generations',
    name: '卡卡列夫的后代',
    description: '一团燃烧着的火元素',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 600,
    exp: 30,
    atk: 25,
    fireAbsorb: 1.2,
    level: 50,
    atkSpeed: 0.4,
    skills: [
      {
        key: 'fireElement.fireball',
        level: 0,
      },
    ],
    affixes: {
      stronger: 2,
      recover: 0.5,
    },
    loots: [
      {
        key: 'gold',
        count: [5, 25],
        rate: 0.1,
      },
      {
        type: 'equip',
        rate: 0.1,
        mfRate: 1,
      },
    ],
  },
  {
    key: 'kakarif.servants',
    name: '卡卡列夫的仆从',
    description: '一种来自火元素位面的蛇形生物',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    fireAbsorb: 0.3,
    maxHp: 750,
    exp: 30,
    atk: 30,
    level: 52,
    atkSpeed: 0.4,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
      {
        key: 'shaman.fireball',
        level: 0,
      },
    ],
    affixes: {
      stronger: 2,
      faster: 1,
      recover: 0.5,
    },
    loots: [
      {
        key: 'gold',
        count: [5, 35],
        rate: 0.1,
      },
      {
        type: 'equip',
        rate: 0.15,
        mfRate: 1.5,
      },
    ],
  },
  {
    key: 'kakarif.illusion',
    name: '卡卡列夫的幻象',
    description: '一人高的元素生物，灼热的气浪迎面而来',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 10000,
    fireAbsorb: 1.0,
    hpRecovery: 20,
    exp: 1200,
    atk: 50,
    level: 56,
    atkSpeed: 0.5,
    skills: [
      {
        key: 'kakarif.melee',
        level: 0,
      },
      {
        key: 'kakarif.mad',
        level: 0,
      },
    ],
    affixes: {
      stronger: 2,
      faster: 1,
      recover: 0.5,
    },
    loots: [
      {
        key: 'gold',
        count: [50, 150],
        rate: 0.25,
      },
      {
        type: 'equip',
        rate: 1,
        mfRate: 2,
      },
    ],
  },
];
