/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = [
  {
    key: 'knight.normal',
    name: '圣殿骑士',
    description: '一团燃烧着的火元素',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 600,
    exp: 30,
    atk: 20,
    def: 200,
    level: 50,
    atkSpeed: 0.4,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
      {
        key: 'shieldShock',
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
    key: 'knight.prayer',
    name: '圣殿牧师',
    description: '一种来自火元素位面的蛇形生物',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 750,
    exp: 30,
    atk: 10,
    level: 52,
    def: 100,
    atkSpeed: 0.4,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
      {
        key: 'knight.heal',
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
    key: 'knight.leader',
    name: '骑士队长卡罗',
    description: '一人高的元素生物，灼热的气浪迎面而来',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 10000,
    def: 300,
    exp: 1200,
    atk: 50,
    level: 56,
    atkSpeed: 0.5,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
      {
        key: 'knight.shout',
        level: 0,
      },
      {
        key: 'knight.reflect',
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
      {
        type: 'equip',
        rate: 0.5,
        mfRate: 3,
      },
      {
        type: 'equip',
        rate: 0.25,
        mfRate: 5,
      },
    ],
  },
];
