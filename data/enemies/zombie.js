/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = [
  {
    key: 'zombies.farmer',
    name: '农夫发狂',
    description: '两眼发红，口水流了一嘴，看起来极其可怕',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 450,
    atk: 10,
    atkSpeed: 0.4,
    exp: 20,
    level: 36,
    skills: [
      {
        key: 'melee',
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
        count: [1, 10],
        rate: 0.2,
      },
      {
        type: 'equip',
        rate: 0.1,
        mfRate: 1,
      },
    ],
  },
  {
    key: 'zombies.hammersmith',
    name: '铁匠发狂',
    description: '大哥，放下你手里的锤子！有话好好说！',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 600,
    exp: 40,
    atk: 30,
    level: 38,
    atkSpeed: 0.4,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
      {
        key: 'zombie.thumpHead',
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
        count: [5, 10],
        rate: 0.2,
      },
      {
        type: 'equip',
        rate: 0.15,
        mfRate: 1.5,
      },
      {
        type: 'ticket',
        rate: 0.005,
        dungeons: {
          'town.woods': 4,
          'town.neighbourTown.2': 3,
          'town.neighbourTown.3': 1,
        },
      },
    ],
  },
  {
    key: 'zombie.necromancer',
    name: '死灵法师奈布',
    description: '死灵法师头目',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 5000,
    hpRecovery: 15,
    exp: 800,
    atk: 0,
    level: 42,
    atkSpeed: 0.4,
    skills: [
      {
        key: 'zombie.heal',
        level: 0,
      },
      {
        key: 'zombie.hide',
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
        count: [5, 100],
        rate: 1,
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
