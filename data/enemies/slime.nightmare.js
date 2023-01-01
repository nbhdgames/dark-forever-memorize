/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = [
  {
    key: 'nightmare.slime.minimal',
    name: '小史莱姆',
    description: '黏糊糊的一团，是被黑暗之力操控的最原始的生物，不断吞噬周遭的物体。',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 400000,
    atk: 4000,
    atkSpeed: 0.4,
    exp: 800,
    level: 204,
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
        count: [170, 220],
        rate: 1,
      },
      {
        type: 'equip',
        rate: 0.1,
        mfRate: 1,
      },
    ],
  },
  {
    key: 'nightmare.slime.giant.enemy',
    name: '大史莱姆',
    description: '黏糊糊的一大团，缓慢的蠕动着，透过身体还能看到未消化的杂物。',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 800000,
    exp: 1200,
    atk: 10000,
    level: 206,
    atkSpeed: 0.3,
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
        count: [200, 300],
        rate: 1,
      },
      {
        type: 'equip',
        rate: 0.15,
        mfRate: 1.5,
      },
    ],
  },

];
