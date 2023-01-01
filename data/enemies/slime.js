/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = [
  {
    key: 'slime.minimal',
    name: '小史莱姆',
    description:
      '黏糊糊的一团，是被黑暗之力操控的最原始的生物，不断吞噬周遭的物体。',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 25,
    atk: 0.5,
    atkSpeed: 0.2,
    exp: 2,
    level: 10,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
    ],
    affixes: {
      stronger: 2,
      faster: 1,
    },
    loots: [
      {
        key: 'gold',
        count: [1, 5],
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
    key: 'slime.giant',
    name: '大史莱姆',
    description: '黏糊糊的一大团，缓慢的蠕动着，透过身体还能看到未消化的东西。',
    camp: 'neutral',
    race: 'unknown',
    career: 'melee',
    maxHp: 100,
    exp: 3,
    atk: 2,
    level: 12,
    atkSpeed: 0.25,
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
        count: [1, 20],
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
    key: 'slime.giant.enemy',
    name: '大史莱姆',
    description: '黏糊糊的一大团，缓慢的蠕动着，透过身体还能看到未消化的杂物。',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 100,
    exp: 3,
    atk: 1,
    level: 16,
    atkSpeed: 0.25,
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
        count: [1, 20],
        rate: 0.1,
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
          'town.cave2': 1,
        },
      },
    ],
  },
  {
    key: 'slime.queen',
    name: '母体史莱姆',
    description: '不断变形着的黏液，会吞食周围的其它史莱姆。',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 1000,
    def: 100,
    exp: 50,
    atk: 15,
    level: 20,
    atkSpeed: 0.1,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
      {
        key: 'slime.swallow',
        level: 0,
      },
    ],
    loots: [
      {
        key: 'gold',
        count: [1, 100],
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
